import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;

        // Make sure the script is not added multiple times
        if (!document.getElementById('google-translate-script')) {
            script.id = 'google-translate-script';
            document.body.appendChild(script);
        }

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: 'en' },
                'google_translate_element',
            );
        };
   
    }, []);
    
  return (
    <div>

            <header id="header" class="fixed-top d-flex align-items-center">
                <div class="container d-flex align-items-center justify-content-between">
                    <div class="logo winner">
                        <p class="text-light">
                            <a href="/winners">
                                <p
                                    className="  "
                                    style={{
                                        backgroundColor: '#eb5d1e',
                                        borderRadius: '40px',
                                        paddingRight: '50px',
                                        paddingLeft: '40px',
                                        paddingBottom: '10px',
                                        paddingTop: '10px',
                                        marginTop: '10px',
                                        fontFamily: 'sans-serif',
                                    }}
                                >
                                    Previous Winners
                                </p>
                            </a>
                        </p>
                    </div>
                    <div className="logo logoim">
                        <a href="/"><img
                            src="./img/newlogo.png"
                            alt="gracegive"
                            height="auto"
                            width="130px"
                        />
                        </a>
                    </div>
                    <div className='logo language'>
                        <div id="google_translate_element"></div>
                        <script type="text/javascript">
                            {`
                              function googleTranslateElementInit() {
                                new google.translate.TranslateElement(
                                   { pageLanguage: "en" },
                                "google_translate_element"
                                );
                              }
                           `}
                        </script>
                    </div>
                </div>
            </header>
    </div>
  )
}

export default Header