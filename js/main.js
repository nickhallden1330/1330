let elList = document.querySelector('.js-list');
let elInp = document.querySelector('.js-inp');
let elInp1 = document.querySelector('.js-inp1');
let elInp2 = document.querySelector('.js-inp2');
let elForm = document.querySelector('.js-form');
let elBtn = document.querySelector('.js-btn');
const itemFragment = document.createDocumentFragment();
var theme = false;

const localData = JSON.parse(window.localStorage.getItem('List'));

let users = localData || [];
let sortNum = [];

const newFunc = (arr, node) => {
	node.innerHTML = '';
	arr.forEach((el) => {
		let elItem = document.createElement('li');
		let elTitle = document.createElement('h3');
		let elText = document.createElement('p');
		let elLink = document.createElement('a');
		let elBtn = document.createElement('button');

		elTitle.textContent = el.name;
		elText.textContent = el.relationship;
		elLink.textContent = el.phone_number;
		elLink.href = `tel:${el.phone_number}`;
		elLink.setAttribute('class', 'btn btn-info');
		elBtn.textContent = 'Delete';
		elBtn.type = 'submit';
		elBtn.setAttribute('class', 'btn btn-danger ms-4 js-btn');
		elBtn.dataset.userId = el.id;

		elInp.value = '';
		elInp1.value = '';
		elInp2.value = '';

		elItem.appendChild(elTitle);
		elItem.appendChild(elText);
		elItem.appendChild(elLink);
		elItem.appendChild(elBtn);
		itemFragment.appendChild(elItem);
	});
	node.appendChild(itemFragment);
};

newFunc(users, elList);

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	let val1 = elInp.value;
	let val2 = elInp1.value;
	let val3 = elInp2.value;

	let finded = users.findIndex((item) => item.phone_number == val3);

	if (finded >= 0) {
		alert('Простите этот номер уже зарегистрирован');
	} else {
		elInp.value = '';
		elInp1.value = '';
		elInp2.value = '';

		users.push({
			id: users.length + 1,
			name: val1,
			relationship: val2,
			phone_number: val3,
		});

		newFunc(users, elList);

		sortNum.push(val3);
	}
	window.localStorage.setItem('List', JSON.stringify(users));
});

elList.addEventListener('click', function (evt) {
	if (evt.target.matches('.js-btn')) {
		let userId = evt.target.dataset.userId;

		let delUser = users.findIndex((index) => index.id == userId);

		users.splice(delUser, 1);
		newFunc(users, elList);
		window.localStorage.setItem('List', JSON.stringify(users));
	}
});

elBtn.addEventListener('click', () => {
	theme = !theme;
	window.localStorage.setItem('theme', theme ? 'dark' : 'light');
	changeTheme();
});

function changeTheme() {
	if (window.localStorage.getItem('theme') == 'dark') {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
}
changeTheme();
