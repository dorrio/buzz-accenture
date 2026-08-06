# Rebranding a Accenture Connect

Registro del rebranding de la aplicación de **Buzz** (marca de abejas y miel) a
**Accenture Connect** (marca corporativa Accenture, chevron `>` morado). Sirve
como referencia para saber qué se cambió y para iterar con rapidez cuando haya
que actualizar más cosas.

Última actualización: 2026-08-05 (iteración 2: tests unitarios alineados con la marca, avatares de los agentes y gate de CI en verde).

---

## Alcance

Rebranding de **capa visible** en los tres clientes (desktop, web, mobile). Se
cambia lo que el usuario ve; **no** se tocan identificadores internos.

**Sí se cambió:** nombre de producto mostrado, colores de marca, textos de UI,
terminología (fuera abejas/miel), logos e iconos.

**NO se tocó (a propósito):**

- Nombres de crates Rust (`buzz-*`) y del CLI (`buzz`).
- Variables de entorno `BUZZ_*` y globales de test `__BUZZ_E2E_*`.
- Esquema de deep link `buzz://` y `com.buzz.deeplink`.
- Bundle/app IDs: `xyz.block.buzz.app` (Tauri), `xyz.block.buzz.mobile` (Android),
  `PRODUCT_NAME = Buzz` del proyecto Xcode.
- Claves de `localStorage`/almacenamiento (`buzz-theme`, `buzz-communities`, …).
- Nombres de componentes, clases CSS y atributos (`BuzzMark`, `isBuzzTheme`,
  `data-buzz-*`, `.buzz-*`, `--buzz-*`), claves de tema (`buzz` / `buzz-dark`),
  nombres de fichero de assets (`buzz.svg`, `buzz-icon.png`).

Cambiar cualquiera de estos rompería el protocolo, la compatibilidad con el
ecosistema Block, la instalación/firma o el estado guardado de los usuarios.

### Sobre el identifier (bundle ID)

El `identifier` de Tauri (`xyz.block.buzz.app`) y sus equivalentes móviles
(`xyz.block.buzz.mobile`, `PRODUCT_NAME = Buzz` de Xcode) se mantienen a
propósito. Es la identidad de la app para el sistema: firma de código, canal de
actualizaciones, almacenamiento y keychain, deep links y el pipeline de release
del ecosistema Block (`buzz-releases`, que firma con ese ID). Cambiarlo no es un
retoque visible: parte el hilo de actualizaciones de los usuarios ya instalados,
invalida la firma y obliga a rehacer certificados y publicación.

Solo tiene sentido cambiarlo (por ejemplo a `com.accenture.connect`) si Accenture
Connect deja de ser un fork de demostración y pasa a distribuirse como producto
propio e independiente. Eso es un cambio de identidad de pleno derecho (firma,
tiendas, pipeline), no parte del rebranding visible, y debe planificarse aparte.

---

## Decisiones de marca

| Elemento | Valor |
|---|---|
| Nombre de producto | **Accenture Connect** |
| Color primario / acento | Accenture Purple `#A100FF` (hsl `278 100% 50%`) |
| Acento en modo oscuro | `hsl(278 100% 72%)` |
| Degradado de marca (claro) | `#E9D8FF → #F4EEFB` |
| Degradado de marca (oscuro) | `#2A0A4D → #0A0713` |
| Neutrales | Catppuccin desplazado a tinte violeta (misma luminosidad, contraste intacto); fondo oscuro llevado a negro violáceo |
| Tipografía | Inter (ya presente) como sustituto libre de Graphik (propietaria) |
| Marca gráfica | Chevron `>` oficial de Accenture |
| Personas por defecto | Fizz→**Aria**, Honey→**Sage**, Bumble→**Nova** |

Logo fuente (vectorial oficial): [`desktop/public/accenture-logo.svg`](../desktop/public/accenture-logo.svg)
(wordmark + chevron). El chevron aislado es el `polygon` morado de ese archivo.

---

## Qué se cambió, por área

### Color

El color de marca real de los clientes de escritorio/web **no** vive en las
variables CSS de arranque, sino en el sistema de acento del `ThemeProvider`. El
tema por defecto (`buzz`) reutiliza la paleta neutra de GitHub y aplica el
acento por JS.

- `desktop/src/shared/theme/ThemeProvider.tsx` — constante `ACCENTURE_ACCENT =
  "#a100ff"`; `resolveEffectiveAccent()` fija ese acento a los temas `buzz` /
  `buzz-dark`; `DEFAULT_ACCENT` también apunta a él. **Este es el punto clave
  para el color de acento en desktop.**
- `desktop/src/shared/styles/globals/theme.css` — paleta de arranque (fallback)
  en violeta y los tokens de degradado `--buzz-gradient-*`.
- `web/src/shared/styles/globals.css` — misma paleta para el cliente web.
- `mobile/lib/shared/theme/buzz_theme.dart` — degradado de marca (4 stops).
- `mobile/lib/shared/theme/accent_colors.dart` — acento "Accenture" `#A100FF`
  como predeterminado (`defaultAccentIndex`).

### Nombre de producto

- Desktop: `desktop/src-tauri/tauri.conf.json` (`productName`), `desktop/index.html`
  y `web/index.html` (`<title>`), etiquetas del selector de tema.
- iOS: `mobile/ios/Flutter/{Debug,Release}.xcconfig` (`APP_DISPLAY_NAME`),
  `mobile/ios/Runner/Info.plist` (`CFBundleName` + textos de permisos).
- Android: `mobile/android/app/build.gradle.kts` (`app_name`).
- Flutter: `mobile/lib/app.dart` (`title` del `MaterialApp` y label de carga).

### Copy y terminología

Barrido de textos visibles "Buzz" → "Accenture Connect" y retirada de la
metáfora abeja/miel (🐝/🍯, "nest", "honeycomb") en ~65 archivos de desktop, 10
de web y 8 de mobile. Personas Fizz/Honey/Bumble → Aria/Sage/Nova (los `id`
internos `builtin:fizz|honey|bumble` se mantienen). Emojis 🐝 de avatares de
reserva sustituidos por el chevron.

### Logo e iconos

- Componentes de logo (chevron oficial, `currentColor`):
  `desktop/src/shared/ui/buzz-logo/{BuzzMark,FlappingBee,FuzzyLogo}.tsx`.
  `BuzzLogoAnimation.tsx` (morph de la abeja) quedó sin uso.
- Campo del onboarding: `desktop/src/features/onboarding/ui/LandingBees.tsx`
  (chevrons morados en vez de abejas).
- Mobile: `mobile/lib/shared/widgets/tappable_flapping_bee.dart` dibuja el
  chevron oficial (mantiene la API `width`/`color`).
- Favicon: `desktop/public/accenture.svg`.
- Iconos de app generados desde el chevron oficial: Tauri
  (`desktop/src-tauri/icons/`), iOS (`mobile/ios/Runner/Assets.xcassets/AppIcon.appiconset/`),
  Android (`mobile/android/app/src/main/res/mipmap-*/`), app-icons
  (`web/src/assets/app-icon@3x.png`, `desktop/public/app-icon@{2x,3x}.png`).
- Wordmarks: `desktop/public/landing/accenture-wordmark.png` (`accenture>`),
  `mobile/assets/images/accenture-icon.png` (chevron).
- Avatares de los agentes por defecto (Aria/Sage/Nova) en el onboarding:
  `desktop/public/onboarding/starter-team/{aria,sage,nova}.png` (renombrados desde
  los antiguos `fizz/honey/bumble.png`, que eran las abejas). Son placeholders de
  marca: inicial + chevron sobre un círculo morado, un tono por agente. El nombre
  de fichero se pudo cambiar porque solo lo referencia el propio repo
  (`WelcomeKickoffStage.tsx`, `CommunityOnboardingFlow.tsx` y dos specs E2E), sin
  dependencia externa. Distinto de `buzz.svg`/`buzz-icon.png`, que se mantienen.

---

## Cómo iterar

### Cambiar el color de marca

1. Acento (desktop): `ACCENTURE_ACCENT` en `ThemeProvider.tsx`.
2. Acento (mobile): entrada "Accenture" en `accent_colors.dart`.
3. Degradado: tokens `--buzz-gradient-*` en `theme.css` (desktop) y los stops de
   `buzz_theme.dart` (mobile).
4. Neutrales/fallback: bloques `:root` y `.dark` en `theme.css` y en
   `web/src/shared/styles/globals.css`.

### Cambiar el logo

1. Sustituir el vector oficial en `desktop/public/accenture-logo.svg`.
2. Actualizar el `polygon` del chevron en los tres componentes de
   `desktop/src/shared/ui/buzz-logo/`, en `desktop/public/accenture.svg`, en
   `tappable_flapping_bee.dart` y en el generador (`CHEVRON` en
   `desktop/scripts/gen-brand-assets.mjs`).
3. Regenerar los iconos (abajo).

### Regenerar iconos

Requiere Hermit activo y el navegador de Playwright
(`pnpm --filter buzz exec playwright install chromium`).

```bash
. ./bin/activate-hermit
TMP=$(mktemp -d)

# 1. Masters (chevron + wordmark) desde el logo oficial
node desktop/scripts/gen-brand-assets.mjs "$TMP" desktop/public/accenture-logo.svg

# 2. Tauri (desktop): genera icns/ico/png/Square*/Store + sets del proyecto Tauri
(cd desktop && pnpm tauri icon "$TMP/ac-icon-1024.png")

# 3. iOS (Flutter): un PNG por entrada de AppIcon.appiconset/Contents.json
#    (20/29/40/60/76/83.5 en @1x/2x/3x + 1024) con `sips -z <px> <px>`.
# 4. Android (Flutter): ic_launcher(.png/_round) desde ac-icon-1024 y
#    ic_launcher_foreground desde ac-foreground-1024, por densidad
#    (mdpi/hdpi/xhdpi/xxhdpi/xxxhdpi). Fondo adaptativo: @color/ic_launcher_background (#000).
# 5. app-icons: web@3x=168, desktop@2x=112, desktop@3x=168.
# 6. Wordmarks: copiar ac-wordmark-777x326.png y ac-mobile-294x197.png a sus rutas.
```

`sips` es nativo de macOS. En otros sistemas, usar ImageMagick/rsvg o `sharp`.

### Regenerar los avatares de los agentes

El generador también produce `ac-agent-{aria,sage,nova}.png` (avatar 512x512:
inicial + chevron sobre círculo morado, un tono por agente). Tras generarlos,
cópialos a sus rutas manteniendo el nombre de fichero:

```bash
node desktop/scripts/gen-brand-assets.mjs "$TMP" desktop/public/accenture-logo.svg
cp "$TMP/ac-agent-aria.png" desktop/public/onboarding/starter-team/aria.png
cp "$TMP/ac-agent-sage.png" desktop/public/onboarding/starter-team/sage.png
cp "$TMP/ac-agent-nova.png" desktop/public/onboarding/starter-team/nova.png
```

Para cambiar el tono, la inicial o la forma, edita el array `AGENTS` del generador.

---

## Hecho en la iteración 2

- Tests unitarios alineados con la marca: 8 de desktop (`node:test`) y 6 de
  mobile (`flutter test`) asertaban cadenas antiguas ("Buzz event", "Welcome to
  Buzz", "Join this Buzz community?", el label de tema "Buzz", los nombres
  Fizz/Honey/Bumble, el acento por defecto negro). Se actualizaron los valores
  esperados al copy/acento nuevos, sin tocar identificadores internos
  (`terminalOwner`, `builtin:fizz|honey|bumble`, claves `buzz`/`buzz-dark`, el
  token de protocolo `[Buzz event: …]` que emite el harness).
- Avatares de los agentes por defecto (ver "Logo e iconos" arriba).
- Formato aplicado (biome + dart format) y gate de CI en verde (ver Verificación).

## Hecho en la iteración 3

- Renombrados de assets internos (saco 2): avatares `aria/sage/nova.png` (desde
  `fizz/honey/bumble.png`), favicon `accenture.svg` (desde `buzz.svg`), wordmark
  `accenture-wordmark.png`, icono mobile `accenture-icon.png`. Referencias
  actualizadas (componentes, `index.html`, `pubspec.yaml`, specs E2E).
- Splash: `launch_image` de Android (5 densidades) y `LaunchImage` de iOS
  (1x/2x/3x) regenerados con el chevron morado (fondo del splash: negro).
- `dmg-background.png`: nuevo fondo de marca (gradiente lavanda + wordmark).
- Código muerto eliminado: `BuzzLogoAnimation.tsx` y `buzz-logo-animation.css`.
- Personas en el backend: resultó NO ser un remate. `buzz-persona` no define
  nombres de persona de producción; las apariciones de Fizz/Honey/Bumble en Rust
  son fixtures de test. Los nombres por defecto los siembra el cliente (ya
  rebrandeado). Contra el relay real no aparecen nombres de abeja.

## Remates pendientes

- `desktop/src-tauri/icons/buzz-source.png`: huérfano (0 referencias), se puede
  borrar.
- 2 aserciones E2E con copy antiguo sin resolver (el texto nuevo no es evidente
  sin más contexto): `agents.spec.ts:1143` (`"Send in Buzz"`) y
  `onboarding-agent-defaults.spec.ts:664` (`toHaveText("Buzz")`, label corto del
  harness). El resto de specs E2E ya están alineadas (onboarding, config-bridge,
  smoke, deep-link-invite, needs-restart, nostr-bind, global-agent-config). Los
  E2E no corren en el gate local, así que esto no bloquea.
- Fixtures de test que usan "Fizz"/"Honey" como nombres de agente de ejemplo (en
  clientes y en Rust): son datos ficticios, no marca de producto; se dejan.

---

## Verificación

Estado tras la iteración 2, con Hermit activo (`. ./bin/activate-hermit`). Todo
en verde:

- Desktop: lint (`just desktop-check`), build (`just desktop-build`) y tests
  (`just desktop-test`, 4129/4129).
- Web: lint (`just web-check`) y build (`just web-build`).
- Mobile: formato, `flutter analyze` y `flutter test` (`just mobile-check` +
  `just mobile-test`). Flutter SÍ está disponible vía Hermit; el aviso previo de
  "sin toolchain local" era falso (faltaba activar Hermit).
- Rust: `fmt-check`, `clippy`, `test-unit` y los `desktop-tauri-*`
  (fmt-check/clippy/check/test). No se tocó Rust, así que este bloque es
  ortogonal al rebranding; se corre aparte por su duración.

Notas:

- El formato (biome + dart) se aplica a mano: los git hooks no corren en el
  worktree. `just fix-all` lo hace en un paso desde el checkout principal.
- `desktop-tauri-test` incluye tests de procesos/timeouts (p. ej.
  `test_promptly_exited_leader_…obeys_the_ceiling`) sensibles a la carga. Si se
  corre en paralelo con `flutter test` o builds pesados puede dar un falso
  negativo; aislado pasa. Correrlo sin competencia por CPU.

Capturas de desktop: `just desktop-screenshot`.
