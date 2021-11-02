const goals = {
	protein: 130,
	carbs: 300,
	fat: 60
}


let green = { red: 88, green: 166, blue: 28 };
let grey = { red: 51, green: 74, blue: 96 };

function mix(color1, color2, weight) {
	// Ported from sass implementation in C
	// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
	const p = weight === undefined ? 0.5 : weight;

	const w = 2 * p - 1;
	const a = 0;

	const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
	const w2 = 1 - w1;

	return [
		w1 * color1.red + w2 * color2.red,
		w1 * color1.green + w2 * color2.green,
		w1 * color1.blue + w2 * color2.blue,
	];
}

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

function updateNutrient( target, name ) {
	const current = parseInt(target.childNodes[0].nodeValue);
	const distance = current / goals[name]
	console.log(name, distance)
	const [r, g, b] = mix(grey, green, distance);

	target.innerHTML = `<span style="color:rgb( ${r} ${g} ${b} )">${current}g</span><span> / ${goals[name]}g</span><span>${capitalize(name)}</span>`;

}

setTimeout(() => {
	const [protein, carbs, fat] = [
		...document.querySelector(".macronutrients").children,
	];

	updateNutrient(protein, 'protein')
	updateNutrient(carbs, 'carbs')
	updateNutrient(fat, 'fat')

}, 500)
