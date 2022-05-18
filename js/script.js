$(document).ready(() => {

    /** ELEMENTS THAT WILL BE USED IN THE GAMEPLAY PART */

    let start_ver = false

    let player = $("#player")
    let ball = $("#ball")
    let border_bottom = $("#border-bottom")
    let border_top = $("#border-top")
    let border_right = $("#border-right")
    let border_left = $("#border-left")

    /** **************************************************/


    $("#ball").hide();
    player.hide();

    $("#start").click(function Innit(){

        start_ver = true;

        if (start_ver == true) {
            player.show()
            $("#start").hide()
            ball.show();

            $("#field").mouseover(() => {
                $("#field").mousemove((e) => {
                    // console.log(e.pageY)
                    playerMove(e.pageY)
                })
            })

            ballMove();
        }
    });

    /** FUNCTIONS THAT WILL BE USED ALONG THE CODE */
    //! MOVE THE PLAYER SIDE
    function playerMove(y) {
        if (y < border_bottom.position().top - 43) {
            player.css({ top: (y - 43) + 'px' })
        }
    }
    function isOverlapping(div1, div2) {
        div1 = div1.getBoundingClientRect();
        div2 = div2.getBoundingClientRect();
        return (div1.right > div2.left &&
            div1.left < div2.right &&
            div1.bottom > div2.top &&
            div1.top < div2.bottom)
    }

    //!MOVE THE BALL
    function ballMove() {
        if (start_ver == true) {
            /**
             * ? Variables that will define the direction that the ball will go 
             */
            var back_x = false;
            var back_y = false;

            var go = 'right';
            // ******************************



            setInterval(() => {

                let ballPosition = ball.position();

                let player = $("#player").position();

                if (isOverlapping(document.querySelector("#player"), document.querySelector("#ball"))) {
                    go = 'right'
                }

                switch (go) {
                    case 'right':
                        {
                            if (ballPosition.left < border_right.position().left - 20) {
                                ball.css({ left: '+=5px' })
                            }
                            else { go = 'left' }
                        }
                        break;

                    case 'left':
                        {
                            if (ballPosition.left > border_left.position().left) {
                                ball.css({ left: '-=5px' })
                            }
                            else { go = 'right' }
                        }
                        break;

                    case 'top':
                        {
                            if (ballPosition.top > border_top.position().top) {
                                ball.css({ top: '-=5px' })
                            }
                            else { go = 'bottom' }
                        }
                        break;

                    case 'bottom':
                        {
                            if (ballPosition.top < border_bottom.position().top) {
                                ball.css({ top: '+=5px' })
                            }
                            else { go = 'top' }
                        }
                        break;
                }

            }, 10);
        }
    }
    /** **************************************************/


})