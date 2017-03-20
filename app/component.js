export default function() {

	const test = () => {
		return 3;
	}

	var element = document.createElement('h1');
	element.innerHTML = "Hello world ! "+test();
	return element;
}