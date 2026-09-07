export function Sidebar () {
  return <>
    <input id='sidebar-checkbox' type='checkbox' class='peer' hidden />
    <aside class='not-md:fixed not-peer-checked:-left-64 z-6 h-full w-64 flex flex-col border-r border-base-content/20 bg-base-100'>
      <div class='mt-auto text-sm text-center pb-4'>
        Diseño basado en&nbsp;
        <a
          href='https://www.usebruno.com/'
          class='link link-accent'
        >
          Bruno
        </a>
      </div>
    </aside>
    <label class='md:hidden not-peer-checked:hidden fixed z-5 h-full w-full bg-black/30' htmlFor='sidebar-checkbox' />
  </>
}
