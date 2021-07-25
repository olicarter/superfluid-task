# Superfluid task

Frontend written in JavaScript (React) that connects with a user's MetaMask wallet and shows Superfluid flows for their first MetaMask address.

There is a **very** simple backend implemented as a Netlify function that just returns a URL of a fake user's avatar for presentation. Started to implement Mongo Atlas and a simple form in the FE to assign a name to a flow but it was taking a considerable amount of time and it wasn't specified how complex the BE should be, so I stashed it. Happy to stash pop and continue to implement a more complex BE if required.

## Potential improvements

This list could go on forever but these are just a few improvements that could be made.

- Use of `sum` field to accurately calculate total amount transferred via flow based on past updates. Currently just basing data off latest flow update.
- Route to `/` if trying to access `/dashboard` when not connected to MetaMask.
- Error handling.
- Less CSS animations, very GPU intensive when animating full page worth of pixels.
- More information to make it clear what information is being shown. Seeing as it is only a test task I figured this was sufficient.
- Ability to select connected address from wallet, currently only display data from first.
- Move Superfluid logic into context.
- TypeScript! I started with TS but realised the SF SDK didn't have typings so figured I would just use JS.

## Testing

As noted, testing wasn't required for this task so instead I'll just detail how I would go about it.

- Each component directory would contain a test file with a snapshot test and tests covering all event handlers and props.
- Tests would account for loading and error states.
- External modules would be mocked to ensure test stability.
- Ideally test coverage should be at 100%, but in the real world this is likely to be lower when balancing quick releases with a reliable codebase.
- In production you would likely also have:
  - E2E tests run in CI pipeline e.g. Cypress.
  - Potentially visual snapshot tests too e.g. Loki, Percy
