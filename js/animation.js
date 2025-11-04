
const cards = document.querySelectorAll('.card');
const BG = document.getElementById('BG');
let currentSelected = null;

console.log('cards:', cards.length);

cards.forEach(card => {

	card.addEventListener('mousemove', (e) => {
		if (currentSelected) return; // 選択中はホバー効果を停止

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
		if (currentSelected) return;
		gsap.to(card, {
			rotationX: 0,
			rotationY: 0,
			duration: 0.5,
			ease: 'elastic.out(1, 0.5)'
		});
	});

	card.addEventListener('click', () => {
		// 既にこのカードが選択中ならリセット
		if (currentSelected === card) {
			currentSelected = null;
			BG.classList.remove('over');
			cards.forEach(c => {
				c.classList.remove('choise');
				c.classList.remove('dim');
				gsap.to(c, {
					x: 0,
					y: 0,
					xPercent: 0,
					yPercent: 0,
					scale: 1,
					rotationX: 0,
					rotationY: 0,
					duration: 0.6,
					ease: 'power2.inOut',
					clearProps: 'position,top,left,zIndex'
				});
			});
			return;
		}

		// 新しく選択
		currentSelected = card;
		BG.classList.add('over');

		const viewportCenterX = window.innerWidth / 2;
		const duration = 0.8;

		cards.forEach(c => {
			const isSelected = c === card;
			if (isSelected) {
				c.classList.add('choise');
				c.classList.remove('dim');
				gsap.to(c, {
					rotationY: 360,
					scale: 2,
					position: 'fixed',
					top: '50%',
					left: '50%',
					xPercent: -50,
					yPercent: -50,
					transformOrigin: 'center center',
					duration,
					ease: 'power2.inOut',
					backgroundColor: '#ccc'
				});
			} else {
				c.classList.remove('choise');
				c.classList.add('dim');
				const rect = c.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const shiftX = (viewportCenterX - centerX) * 0.5; // 真ん中へ50%寄せる
				gsap.to(c, {
					x: shiftX,
					scale: 0.95,
					rotationY: 0,
					duration,
					ease: 'power2.inOut'
				});
			}
		});
	});

});
