import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { trace } from '@opentelemetry/api';

// For sending traces for all http requests
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';

const exporter = new OTLPTraceExporter({
  url: `${process.env.REACT_APP_OTEL_COLLECTOR_ENDPOINT}:443/v1/traces`,
});

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: `${process.env.OTEL_SERVICE_NAME}`,
  }),
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register({
  contextManager: new ZoneContextManager()
});

// wrapper used for manual tracing
// export const withTracing = (name: string, action: (params: any) => void, attributes?: { [key: string]: string }) => {
//   return async (...params: any[]) => {
//     const tracer = trace.getTracer('honeycomb');
//     const span = tracer.startSpan(name);
//     if (attributes) {
//       Object.entries(attributes).forEach(([key, val]) => {
//         span.setAttribute(key, val);
//       });
//     }
//     const result = await action(params);
//     span.end();

//     return result;
//   };
// };

registerInstrumentations({
  instrumentations: [
    new XMLHttpRequestInstrumentation({
      propagateTraceHeaderCorsUrls: [
        new RegExp(`${process.env.REACT_APP_BACKEND_URL}`, 'g')
      ]
    }),
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [
        new RegExp(`${process.env.REACT_APP_BACKEND_URL}`, 'g')
      ]
    }),
    new DocumentLoadInstrumentation(),
  ],
});
// export const TraceProvider = ({ children }: any) => (<>{children} </>);
