# Edu2Career

`Edu2career/E2C-website-host` holds the public Edu2Career website at [edu2career.me](https://edu2career.me).

The site explains the project, its approach, and the platform we're building. It's a static site. The platform previews are examples of planned features, and the contact button opens options for emailing the founder.

## Files

```text
E2C-website-host/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── campus.png
│   │   └── giri-manohar-vemula.jpg
│   └── icons/
│       ├── favicon.svg
│       └── ui.svg
├── README.md
├── CNAME
└── .gitignore
```

Edit page content in `index.html`, design in `css/styles.css`, and interactions in `js/main.js`. `ui.svg` contains the interface icons. The campus illustration is the original PNG. The founder portrait is Giri's supplied photograph, stored as `giri-manohar-vemula.jpg`.

The founder bio draws on Giri's résumé and GitHub work. It links to selected public projects and the full repository list. These are independent projects; the Edu2Career platform is still planned.

Contact email: `founder@edu2career.me`. Email links, the footer, and the contact dialog use this address. The copy button reads it from the dialog's email field.

## Run locally

From this folder:

```sh
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000). There's no build step or dependency installation.

## Interactions

- The mobile menu closes after choosing a link, pressing Escape, clicking outside the header, or moving focus out of it.
- Explore, Prepare, and Present switch the platform preview. Use Left, Right, Home, and End to move between tabs with the keyboard.
- Say hello opens a contact dialog. Close it with Escape, the close button, or a click on the backdrop. Copy puts the email address on the clipboard. If that fails, the address is selected for manual copying.
- Navigation marks the section you're reading. A back-to-top button appears after scrolling.

Buttons have hover, press, and focus states. Motion follows the device's reduced-motion setting. With JavaScript disabled, navigation stays visible, all platform examples remain readable, and contact links open the email app.

## Review and publish

Work on `dev`. Check desktop and phone layouts, keyboard navigation, tabs, the contact dialog, the copy fallback, and FAQ answers before merging into `main`. Include a 320px-wide viewport and a browser with JavaScript disabled. Check the console and network panel for errors.

GitHub Pages publishes `main`. `CNAME` sets the custom domain to `edu2career.me`. Publish the CSS, JavaScript, and assets with the HTML.

`live-2026-10-07` marks the first working public site. `live-2026-10-07-docs` marks the version with repository documentation.

## Web guidance

The layout uses [web.dev's responsive design guidance](https://web.dev/articles/accessible-responsive-design). Transitions respect [reduced motion](https://web.dev/learn/css/transitions). Tab controls follow the [W3C tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), and contact uses the [native HTML dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog).
