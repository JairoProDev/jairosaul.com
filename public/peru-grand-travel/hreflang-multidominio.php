<?php
/**
 * Plugin Name: Hreflang Multidominio
 * Description: Emite anotaciones hreflang recíprocas entre instalaciones WordPress
 *              independientes que sirven el mismo catálogo en distintos idiomas.
 * Version:     1.0.0
 * Author:      Jairo
 *
 * ---------------------------------------------------------------------------
 * PROBLEMA QUE RESUELVE
 * ---------------------------------------------------------------------------
 * WPML y Polylang gestionan varios idiomas DENTRO de una instalación. No sirven
 * cuando cada idioma vive en un dominio y una instalación separada. En ese caso
 * hay que declarar las equivalencias manualmente y garantizar reciprocidad.
 *
 * Sin hreflang, tres dominios que publican el mismo tour en tres idiomas compiten
 * entre sí en vez de sumar señales, y Google elige por su cuenta qué versión
 * mostrar a cada mercado.
 *
 * ---------------------------------------------------------------------------
 * INSTALACIÓN
 * ---------------------------------------------------------------------------
 * 1. Copiar este archivo a wp-content/plugins/hreflang-multidominio/ en CADA
 *    instalación de la red y activarlo. (O pegarlo en el functions.php del tema
 *    hijo, aunque como plugin sobrevive a cambios de tema.)
 * 2. Cargar el mapa $HREFLANG_MAPA desde equivalencias-hreflang.csv
 *    (mismo array en las tres instalaciones).
 * 3. Verificar con: curl -s URL | grep hreflang
 * 4. Validar reciprocidad con auditor_seo.py y, después, en el informe de
 *    Segmentación internacional de Search Console.
 *
 * REGLAS QUE ESTE CÓDIGO RESPETA (y que son las que casi todos rompen):
 *   - Reciprocidad: si A declara a B, B declara a A. Se logra usando el MISMO
 *     mapa en las tres instalaciones.
 *   - Autorreferencia: cada página se declara a sí misma.
 *   - x-default para el tráfico sin idioma coincidente.
 *   - URLs absolutas, canónicas y finales (sin redirecciones intermedias).
 *   - Códigos de idioma válidos: ISO 639-1, opcionalmente + ISO 3166-1 alpha-2.
 *     Se usa pt-BR y no pt porque el mercado real es Brasil.
 * ---------------------------------------------------------------------------
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Mapa de equivalencias. Cada grupo es una misma oferta en distintos idiomas.
 * Clave = código hreflang. Valor = URL absoluta y canónica.
 *
 * Completar desde equivalencias-hreflang.csv — no escribirlo a mano
 * URL por URL si el catálogo tiene decenas de tours.
 */
$HREFLANG_MAPA = array(

	array(
		'en'    => 'https://www.perugrandtravel.com/',
		'es'    => 'https://www.viajesmachupicchutours.com/',
		'pt-BR' => 'https://www.machupicchupacotes.com/',
	),

	array(
		'en'    => 'https://www.perugrandtravel.com/tour/sacred-valley-of-the-incas-tour/',
		'es'    => 'https://www.viajesmachupicchutours.com/tour/tour-valle-sagrado-de-los-incas/',
		'pt-BR' => 'https://www.machupicchupacotes.com/pacote/vale-sagrado-dos-incas/',
	),

	// Un grupo por cada fila del CSV de equivalencias.
);

/**
 * Idioma que actúa como x-default. Normalmente el mercado internacional (inglés).
 */
const HREFLANG_X_DEFAULT = 'en';

/**
 * Normaliza una URL para comparación: sin protocolo variable, sin barra final,
 * sin query ni fragmento.
 */
function hml_normalizar( $url ) {
	$url = strtok( $url, '?' );
	$url = strtok( $url, '#' );
	$url = preg_replace( '#^https?://#', '', $url );
	return rtrim( $url, '/' );
}

/**
 * Devuelve la URL canónica actual, tal y como la sirve el sitio.
 */
function hml_url_actual() {
	if ( is_front_page() || is_home() ) {
		return home_url( '/' );
	}
	$id = get_queried_object_id();
	if ( $id ) {
		$permalink = get_permalink( $id );
		if ( $permalink ) {
			return $permalink;
		}
	}
	return home_url( add_query_arg( array() ) );
}

/**
 * Busca el grupo de equivalencias que contiene la URL actual.
 */
function hml_grupo_actual() {
	global $HREFLANG_MAPA;
	$actual = hml_normalizar( hml_url_actual() );

	foreach ( $HREFLANG_MAPA as $grupo ) {
		foreach ( $grupo as $url ) {
			if ( hml_normalizar( $url ) === $actual ) {
				return $grupo;
			}
		}
	}
	return null;
}

/**
 * Emite las etiquetas en <head>.
 *
 * Decisión deliberada: si la página NO está en el mapa, no se emite nada.
 * Emitir hreflang parcial o apuntando a equivalencias inventadas es peor que
 * no emitirlo: Google ignora el grupo entero y aparecen errores en GSC.
 */
function hml_emitir_hreflang() {
	// No emitir en páginas no indexables ni en resultados de búsqueda internos.
	if ( is_search() || is_404() || is_paged() ) {
		return;
	}

	$grupo = hml_grupo_actual();
	if ( ! $grupo ) {
		return;
	}

	echo "\n<!-- hreflang multidominio -->\n";

	foreach ( $grupo as $lang => $url ) {
		printf(
			'<link rel="alternate" hreflang="%s" href="%s" />' . "\n",
			esc_attr( $lang ),
			esc_url( $url )
		);
	}

	if ( isset( $grupo[ HREFLANG_X_DEFAULT ] ) ) {
		printf(
			'<link rel="alternate" hreflang="x-default" href="%s" />' . "\n",
			esc_url( $grupo[ HREFLANG_X_DEFAULT ] )
		);
	}

	echo "<!-- /hreflang multidominio -->\n\n";
}
add_action( 'wp_head', 'hml_emitir_hreflang', 1 );

/**
 * Diagnóstico: añade ?hml_debug=1 a cualquier URL (como administrador) para ver
 * si la página está mapeada y qué grupo le corresponde.
 */
function hml_debug() {
	if ( ! isset( $_GET['hml_debug'] ) || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$grupo = hml_grupo_actual();
	echo "\n<!-- HML DEBUG\n";
	echo 'URL actual: ' . esc_html( hml_url_actual() ) . "\n";
	echo $grupo
		? 'Grupo encontrado: ' . esc_html( wp_json_encode( $grupo ) ) . "\n"
		: "SIN GRUPO: esta URL no está en el mapa de equivalencias.\n";
	echo "-->\n";
}
add_action( 'wp_head', 'hml_debug', 99 );
