function change_tab(tab_name) {
  var someTabTriggerEl = document.querySelector('a[href="' + tab_name + '"]');
  document.querySelector('#auth-active-slide').innerHTML = someTabTriggerEl.getAttribute('data-slide-index');
  var actTab = new bootstrap.Tab(someTabTriggerEl);
  actTab.show();
}

function mixinShow(icon, title) {
  const finished = new Promise((resolve) => {
    setTimeout(resolve, 1100);
  })

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1100,
    padding: "0 0 .2em 1em",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: icon,
    title: `
      <h5 class="lh-1 m-0">
        ${title}
      <h5 />
    `,
  });
  return finished;
}

function fireTimeShow(icon, title, time, html = null) {
  let timerInterval;
  Swal.fire({
    title: title,
    icon: icon,
    html: html,
    timer: time,
    timerProgressBar: true,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  }).then(() => {
    clearInterval(timerInterval);
  });
}
