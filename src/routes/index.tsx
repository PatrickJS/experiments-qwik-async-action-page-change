import { component$, sync$, $, Signal, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

// import Home from "~/routes/home";
export const Child = component$((props: { parent: Signal<any> }) => {
  return (
    <div>
      <h1>Child Component</h1>
      {props.parent.value}
    </div>
  );
});

export default component$(() => {
  const parent = useSignal('Hello from parent');

  const loading$ = sync$((evt: Event, target: HTMLButtonElement) => {
    console.log('loading', evt, target);
    const span = target.querySelector('span') as any;
    target.disabled = span.hidden;
    span.hidden = !span.hidden;
    if (span.hidden) {
      throw new Error('Loading...');
    }
  });

  return (
    <>
      {/* I moved all logic to another file in-case you want to quickly delete and prototype something */}
      {/* <Home /> */}
      <div style={{ padding: '1rem' }}>
        <div>Hello World</div>
        <button
          onClick$={[
            loading$,
            $(async () => {
              console.log('Hello from parent before 5 seconds');
              await new Promise((r) => setTimeout(r, 5000));
              parent.value = 'Hello from parent after 5 seconds';
              console.log('Hello from parent after 5 seconds');
            }),
            loading$,
          ]}
        >
          Action!
          <span hidden>Loading...</span>
        </button>
        <Child parent={parent} />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
