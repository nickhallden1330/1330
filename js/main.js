let elList = document.querySelector('.js-list');
let elInp = document.querySelector('.js-inp');
let elInp1 = document.querySelector('.js-inp1');
let elInp2 = document.querySelector('.js-inp2');
let elForm = document.querySelector('.js-form');

elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();

	let elItem = document.createElement('li');
	let elTitle = document.createElement('h3');
	let elText = document.createElement('p');
	let elLink = document.createElement('a');

	elTitle.textContent = elInp.value;
	elText.textContent = elInp1.value;
	elLink.textContent = elInp2.value;
	elLink.href = `tel:${elInp2.value}`;

	elInp.value = '';
	elInp1.value = '';
	elInp2.value = '';

	elItem.appendChild(elTitle);
	elItem.appendChild(elText);
	elItem.appendChild(elLink);
	elList.appendChild(elItem);
});
