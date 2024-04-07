import * as Sentry from "@sentry/vue";
import VueEllipsis from '../../lib/vue-ellipsis-component';

export default ({
  Vue
}) => {
  Vue.use(VueEllipsis);
  Sentry.init({
    Vue,
    dsn: "https://278a1d4007dfc1d0ba943a81582d42af@o196334.ingest.us.sentry.io/4506935647666176",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/vue-ellipsis\.ruofee\.cn/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}
