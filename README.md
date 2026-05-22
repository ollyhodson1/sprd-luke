# Luke Pale sPRD simulation

This is a GitHub-ready React/Vite simulation of Luke Pale's sPRD record.

## Scenario summary

Luke Pale is a University of Salford Part Two learner on Placement 2 of Part Two. The record is already completed and locked up to the midpoint stage, including Learning Environment, Orientation, Initial Interview, Reflection on Values, Professional Values, Plan of Action and Mid-Point Interview.

Students are acting as the Practice Supervisor. Their task is to:

1. Add and sign additional feedback about poor practice observed while working with Luke.
2. Review the Timesheets tab against the ward student rota.
3. Remove the Tuesday 11 August 2026 timesheet activity, because Luke was not rostered and did not attend that shift.

When the additional feedback is complete and the fraudulent Tuesday activity has been removed, the completion pop-up appears with the Blackboard code.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build output is created in `dist/`.

## GitHub Pages deployment using the docs folder

This zip already includes a built `docs/` folder for GitHub Pages.

To deploy:

1. Upload all files and folders in this zip to a GitHub repository.
2. In the repository, go to **Settings** > **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose your main branch and set the folder to **/docs**.
5. Save the settings.

The Vite base path is set to `./`, so the app should work from a GitHub Pages project URL without needing to rename the repository in the code.

## Notes

The app stores progress in the browser using `localStorage`. Use the **Reset** button during testing if you need to restore the starting scenario.
