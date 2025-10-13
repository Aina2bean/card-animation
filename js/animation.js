
const card = document.querySelector('.card');
let hover_animation;
let flipped_switch = false;

card.addEventListener('mouseover', () => {
	hover_animation = gsap.to(card, {
		rotationZ: 3,
		x: 5,
		duration: 0.5,
		repeat: -1,
		yoyo: true,
		ease: 'sine.inOut'
	});
});

card.addEventListener('mouseout', () => {
  hover_animation?.kill();
  gsap.to(card, {
		rotationZ: 0,
		duration: 0.4,
		ease: 'power2.out'
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