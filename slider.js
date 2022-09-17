function slider({
	container,
	slide,
	nextArrow,
	prevArrow,
	totalCounter,
	currentCounter,
	wrapper,
	field
}) {

	const btnNext = document.querySelector(nextArrow),
		slider = document.querySelector(container),
		btnPrev = document.querySelector(prevArrow),
		pictures = document.querySelectorAll(slide),
		totalNum = document.querySelector(totalCounter),
		currentNum = document.querySelector(currentCounter),
		pictureWrapper = document.querySelector(wrapper),
		pictureField = document.querySelector(field),
		width = window.getComputedStyle(pictureWrapper).width;

	let pictureIndex = 1;
	let offset = 0;

	function showNumberOfSlides() {
		if (pictures.length < 10) {
			currentNum.textContent = `0${pictureIndex}`;
		} else {
			currentNum.textContent = pictureIndex;
		}
	}

	function getStyleOfDots() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[pictureIndex - 1].style.opacity = 1;
	}

	if (pictures.length < 10) {
		totalNum.textContent = `0${pictures.length}`;
		currentNum.textContent = `0${pictureIndex}`;
	} else {
		totalNum.textContent = pictures.length;
		currentNum.textContent = pictureIndex;
	}

	pictureField.style.width = 100 * pictures.length + '%';
	pictureField.style.display = 'flex';
	pictureField.style.transition = '0.8s all';

	pictureWrapper.style.overflow = 'hidden';

	pictures.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 15;
	display: flex;
	justify-content: center;
	margin-right: 15%;
	margin-left: 15%;
	list-style: none;
`;

	slider.append(indicators);

	for (let i = 0; i < pictures.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
		box-sizing: content-box;
		flex: 0 1 auto;
		width: 30px;
		height: 6px;
		margin-right: 3px;
		margin-left: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		opacity: .5;
		transition: opacity .6s ease;
	`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function deleteNotNumbers(str) {
		return +str.replace(/\D/g, '');
	}

	btnNext.addEventListener('click', () => {
		if (offset == deleteNotNumbers(width) * (pictures.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotNumbers(width);
		}

		pictureField.style.transform = `translateX(-${offset}px)`;

		if (pictureIndex == pictures.length) {
			pictureIndex = 1;
		} else {
			pictureIndex++;
		}

		showNumberOfSlides();

		getStyleOfDots();
	});

	btnPrev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotNumbers(width) * (pictures.length - 1);
		} else {
			offset -= deleteNotNumbers(width);
		}

		pictureField.style.transform = `translateX(-${offset}px)`;

		if (pictureIndex == 1) {
			pictureIndex = pictures.length;
		} else {
			pictureIndex--;
		}

		showNumberOfSlides();

		getStyleOfDots();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			pictureIndex = slideTo;
			offset = deleteNotNumbers(width) * (slideTo - 1);

			pictureField.style.transform = `translateX(-${offset}px)`;

			showNumberOfSlides();

			getStyleOfDots();
		});
	});

}

export default slider;