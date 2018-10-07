window.addEventListener('load', function(){

	/* EMAIL */
	var email = 'contact@drone-p2p.io';
	document.querySelector('#email').innerHTML = '<a class="t-uppercase" href="mailto:'+ email +'">' + email +'</a>';
	/* end of EMAIL */


	/* TOGGLE THEME */
	var themeToggler = document.querySelector('#js-change-theme');
	var themeLight = 'theme-light';
	var themeDark = 'theme-dark';

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

		if(cookieTheme){
			switchTheme(cookieTheme);
		}
		else{
			switchTheme(themeDark);
		}

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
	}
	/* end of TOGGLE THEME */




	/* TEXT SIZE CHANGE */

	var globalTextSize = 100;

	function setTextSize(size){
		document.documentElement.style.fontSize = size + '%';
		document.querySelector('#js-text-size-label').innerHTML = size + '%';
		document.cookie = "textsize="+size;
	}

	var textSize = getCookie('textsize');

	if(textSize){
		setTextSize(textSize);
		globalTextSize = textSize;
	}

	document.querySelector('#js-text-size-minus').addEventListener('click', function(){
		globalTextSize = parseInt(globalTextSize) - 10;
		setTextSize(globalTextSize);
	});

	document.querySelector('#js-text-size-plus').addEventListener('click', function(){
		globalTextSize = parseInt(globalTextSize) + 10;
		setTextSize(globalTextSize);
	});

	/* end of TEXT SIZE CHANGE */


});