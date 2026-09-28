# Publish Roots & Rifts with GitHub Pages (PowerShell)

## Result

After deployment, the public app URL will be:

> **https://pyaim.github.io/RootsAndRifts/**

This package is configured specifically for the `PyAIM/RootsAndRifts` repository. GitHub Actions builds the `dist` folder and deploys that generated static site to GitHub Pages automatically.

> **Do not manually commit or push `dist`.** The included workflow creates the exact `dist` output on GitHub after each push to `main`.

## 1. Replace the local source with the Pages-ready package

1. Download and extract the latest **RootsAndRifts-GitHub-Pages-Ready.zip** package.
2. Replace the contents of `D:\Dev\apps\RootsAndRifts` with the extracted `RootsAndRifts` folder contents. Do **not** copy `node_modules` from an older project.
3. In PowerShell, go to the project root (not `dist`):

```powershell
cd D:\Dev\apps\RootsAndRifts
```

4. Install dependencies and verify the GitHub Pages build locally:

```powershell
pnpm install
pnpm build
```

The build must finish without errors. It creates `D:\Dev\apps\RootsAndRifts\dist`.

## 2. Connect the local folder to your empty GitHub repository

The repository is confirmed empty: https://github.com/PyAIM/RootsAndRifts

Run these commands from `D:\Dev\apps\RootsAndRifts`:

```powershell
git init
git branch -M main
git remote remove origin 2>$null
git remote add origin https://github.com/PyAIM/RootsAndRifts.git
git add .
git commit -m "Publish Roots and Rifts Precalculus expedition"
git push -u origin main
```

### Authentication when `git push` runs

- If Git Credential Manager opens a browser window, sign into GitHub as **PyAIM** and approve the request.
- If Git asks for a password and your normal GitHub password is rejected, create a **fine-grained personal access token** at https://github.com/settings/personal-access-tokens/new. Limit it to the `RootsAndRifts` repository and grant **Contents: Read and write**. Use the token in the password prompt; never paste it into a PowerShell command or commit it to the repository.

## 3. Turn on GitHub Pages once

1. Open https://github.com/PyAIM/RootsAndRifts/settings/pages.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Leave the page open; the first `main` push may already have started the workflow.
4. Open the repository's **Actions** tab and select **Deploy Roots & Rifts to GitHub Pages**.
5. Wait for both **build** and **deploy** to show green check marks.
6. Visit **https://pyaim.github.io/RootsAndRifts/** in a private/incognito browser window to avoid a cached older build.

## 4. Publish later updates

Whenever you change the app locally:

```powershell
cd D:\Dev\apps\RootsAndRifts
pnpm build
git add .
git commit -m "Describe the update"
git push
```

GitHub Actions rebuilds `dist` and publishes the update. Allow about 1–3 minutes after the green Actions check mark for the Pages URL to reflect the new version.

## 5. Add Roots & Rifts to Math-Matters

On the **Gamified Learning** page at https://math-matters.net/, add a new card/button next to your other learning apps with the following content:

- **Title:** Roots & Rifts
- **Description:** A gamified Precalculus expedition through polynomial and rational functions—zeros, multiplicity, division, factorization, complex roots, asymptotes, and sign charts.
- **Button text:** Launch Roots & Rifts
- **Destination URL:** `https://pyaim.github.io/RootsAndRifts/`

If the Math-Matters page is edited through a visual website editor, use those fields directly and publish the page. If you are editing HTML/Markdown, use this link:

```html
<a href="https://pyaim.github.io/RootsAndRifts/" target="_blank" rel="noopener noreferrer">
  Launch Roots &amp; Rifts
</a>
```

For a ready-to-paste card description:

> **Roots & Rifts — Polynomial & Rational Functions**  
> Navigate an interactive Precalculus expedition through polynomial behavior, zeros and multiplicity, long and synthetic division, factorization, complex roots, and rational-function asymptotes. Earn XP, unlock routes, and conquer a final boss battle.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `git push` says `remote origin already exists` | Run `git remote set-url origin https://github.com/PyAIM/RootsAndRifts.git`, then run `git push -u origin main`. |
| GitHub Pages shows 404 | Confirm Settings → Pages → Source is **GitHub Actions**, and wait for the workflow's deploy job to finish. |
| Artwork or music does not load | Confirm that the Pages URL includes `/RootsAndRifts/` and that this Pages-ready package was used. Do not deploy an old `dist` built before this configuration. |
| GitHub Action fails at install | Run `pnpm install` locally, commit the updated `pnpm-lock.yaml`, and push again. |
| Changes are not visible | Hard-refresh with `Ctrl+F5` or open the Pages URL in a private browser window. |
