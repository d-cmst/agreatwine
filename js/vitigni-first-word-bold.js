export function firstWordBold(){ 
  const firstWordBold = document.querySelector(".caption").innerHTML.replace(/[^\s]*/, '<span class="description-bold">Vitigno</span>');
  document.querySelector(".caption").innerHTML = firstWordBold
}