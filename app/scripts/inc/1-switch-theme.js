/* 0-cookie.js requires */
window.addEventListener('load', function(){

	var
		themeToggler = document.querySelector('#js-change-theme'),
		themeLight = 'theme-light',
		themeDark = 'theme-dark';



	function switchTheme(theme){

		if (theme){
			document.body.classList.remove(themeLight, themeDark);
			document.body.classList.add(theme);
			themeToggler.dataset.theme = theme;
			document.cookie = "theme="+theme;
		}
		
	}



	if(themeToggler){

		var cookieTheme = getCookie('theme');

		if(cookieTheme)
			switchTheme(cookieTheme);
		else
			switchTheme(themeDark);


		/* Обрабатываем обычный клик */

		themeToggler.addEventListener('click', function(){

			if(this.dataset.theme == themeDark){
				this.dataset.theme = themeLight;
				switchTheme(themeLight);
			}
			else{
				this.dataset.theme = themeDark;
				switchTheme(themeDark);
			}
		});



		/* Swipe on touch devices */

		var initialTouchX = null;

		function handleTouchStart(e){

			initialTouchX = e.touches[0].clientX;
			
		}

		function handleTouchMove(e){

			if (!initialTouchX)
				return;

			//двинулись влево
			if (initialTouchX > e.touches[0].clientX)
				switchTheme(themeDark);
			//двинулись вправо
			if (initialTouchX < e.touches[0].clientX)
				switchTheme(themeLight);
		}
		
		themeToggler.addEventListener('touchstart', handleTouchStart, false);
		themeToggler.addEventListener('touchmove', handleTouchMove, false);

	}


}, false);