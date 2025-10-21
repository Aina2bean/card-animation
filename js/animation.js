
const cards = document.querySelectorAll('.card');
//let hover_animation;
let flipped_switch = false;

console.log('cards:', cards.length);

cards.forEach(card => {

	card.addEventListener('mousemove', (e) => {

		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const rotateY = ((x / rect.width) - 0.5) * 20;
		const rotateX = ((y / rect.height) - 0.5) * -20;

		gsap.to(card, {
			rotationX: rotateX,
			rotationY: rotateY,
			duration: 0.3,
			ease: 'power2.out'
		});
	});

	card.addEventListener('mouseleave', () => {
		gsap.to(card, {
			rotationX: 0,
			rotationY: 0,
			duration: 0.5,
			ease: 'elastic.out(1, 0.5)'
		});
	});

	card.addEventListener('click', () => {
		flipped_switch = !flipped_switch;
		gsap.to(card, {
			rotationY: flipped_switch ? 180 : 0,
			duration: 0.8,
			ease: 'power2.inOut',
		});
	});

});