$(document).ready(() => {

    /** ELEMENTS THAT WILL BE USED IN THE GAMEPLAY PART */
    var player = $("#player")
    var oponent = $("#oponent")
    var ball = $("#ball")
    var border_bottom = $("#border-bottom")
    var border_top = $("#border-top")
    var border_right = $("#border-right")
    var border_left = $("#border-left")
    var speed = 0.2;
    var goX = 'left';
    var inclination = 5;
    var goY = 'bottom'

    /** BOOLEANS THAT MAKE VERIFICATIONS IN THE CODE */
    var start_ver = false
    var pause = false;

    /** **************************************************/


    $("#ball").hide();
    player.hide();
    oponent.hide();

    $("#start").click(function Innit() {

        start_ver = true;
        $("#field").removeClass('started');

        if (start_ver == true) 
        {
            player.show()
            oponent.show();
            $("#start").hide()
            ball.show();

            setInterval(()=>
            {
                oponentMove();
            }, 10)

            $("#field").addClass('started');

            $("#field").mouseover(() => {
                $("#field").mousemove((e) => {
                    playerMove(e.pageY);
                })
            })

            ballMove();
        }
    });

    /** FUNCTIONS THAT WILL BE USED ALONG THE CODE */
    //! MOVE THE PLAYER SIDE
    function playerMove(y) {
        if (isOverlapping(document.querySelector("#player"), document.querySelector("#border-bottom"))) {
            player.css({ top: "-=" + (y - 45) + 'px' })
        } else {
            player.css({ top: (y - 45) + 'px' })
        }
    }

    /**
     * That function was not made by me
     * finded on stack overflow
     */
    //! FUNCTION THAT MAKES THE COLLISION
    //!MOVE THE BALL
    function ballMove() {
        if (start_ver == true && pause == false) {
            /**
             * ? Variables that will define the direction that the ball will go
             */

            /**
             *  ? Variables that will difine the inclination and speed of the ball
             */
            //*The base speed is 5 pixels per repetition
            // ******************************

            let moveBall = setInterval(() => {

                let ballPosition = ball.position();

                let player = $("#player").position();


                //set the player collision to make the ball return 
                if (isOverlapping(document.querySelector("#player"), document.querySelector("#ball"))) {
                    goX = 'left'

                    speed = (speed < 1 ? speed + 0.2 : speed = 1)
                }

                //set the oponent collision to make the ball return 
                if (isOverlapping(document.querySelector("#oponent"), document.querySelector("#ball"))) {
                    goX = 'right'

                    speed = (speed < 1 ? speed + 0.2 : speed = 1)
                }

                //MAKES THE BALL MOVES IN THE X index
                moveSideBall(goX);

                //MAKES THE BALL MOVES IN THE Y index
                moveVerticalBall(goY);

            }, 10);
        }
        const moveSideBall = (position) => {
            if (isOverlapping(document.querySelector("#ball"), document.querySelector("#border-" + (position == "right" ? "left" : "right")))) {
                goX = (position == "right" ? "left" : "right");
            }
            else {
                (position == "right" ?
                    ball.css({ left: '-=' + speed + 'vw' }) :
                    ball.css({ left: '+=' + speed + 'vw' })
                )
            }
        }

        const moveVerticalBall = (position) => {
            if (isOverlapping(document.querySelector("#ball"), document.querySelector("#border-" + (position == "top" ? "top" : "bottom")))) {
                goY = (position == "top" ? "bottom" : "top");
            }
            else {
                (position == "top" ?
                    ball.css({ top: '-=' + inclination + 'px' }) :
                    ball.css({ top: '+=' + inclination + 'px' })
                )
            }
        }
    }

    function oponentMove() {
        let ballPosition = ball.position().top;
        if (oponent.position().top != ballPosition) 
        {
            if (oponent.position().top > ballPosition) 
            {
                oponent.css({ top: '-=3px' })
            }
            else
            {
                oponent.css({ top: '+=3px' })
            }
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

    /** **************************************************/


})