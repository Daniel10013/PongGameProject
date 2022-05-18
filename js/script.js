$(document).ready(() => {

    /** ELEMENTS THAT WILL BE USED IN THE GAMEPLAY PART */
    var player = $("#player")
    var oponent = $("#oponent")
    var ball = $("#ball")
    var border_bottom = $("#border-bottom")
    var border_top = $("#border-top")
    var border_right = $("#border-right")
    var border_left = $("#border-left")

    /** BOOLEANS THAT MAKE VERIFICATIONS IN THE CODE */
    var start_ver = false
    var pause = false;

    /** **************************************************/


    $("#ball").hide();
    player.hide();
    oponent.hide();

    $("#start").click(function Innit(){

        start_ver = true;

        if (start_ver == true) {
            player.show()
            oponent.show();
            $("#start").hide()
            ball.show();

            $("#field").mouseover(() => {
                $("#field").mousemove((e) => {
                    // console.log(e.pageY)
                    playerMove(e.pageY)
                    console.log(e.pageY)
                })
            })

            ballMove();
        }
    });

    /** FUNCTIONS THAT WILL BE USED ALONG THE CODE */
    //! MOVE THE PLAYER SIDE
    function playerMove(y) {
        console.log("top: " + border_bottom.position().top)
        console.log("y: " + y)

        if((parseInt(y) + 2) > parseInt(border_bottom.position().left))
        {
            player.css({top: (y - 43)+'px'})
        }
    }
    
    /**
     * That function was not made by me
     * founded on stack overflow
     */
    //! FUNCTION THAT MAKES THE COLLISION
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
        if (start_ver == true && pause == false) {
            /**
             * ? Variables that will define the direction that the ball will go
             */
            let goX = 'left';
            let goY = 'none'
            
            /**
             *  ? Variables that will difine the inclination and speed of the ball
             */
            let inclination = 5;
            //*The base speed is 5 pixels per repetition
            let speed = 5;
            // ******************************

            let moveBall = setInterval(() => 
            {

                let ballPosition = ball.position();

                let player = $("#player").position();

                //set the player collision to make the ball return 
                if (isOverlapping(document.querySelector("#player"), document.querySelector("#ball"))) {
                    goX = 'right'
                    
                    speed = (speed < 20 ? speed + 2  : speed = 20)
                }

                //set the oponent collision to make the ball return 
                if (isOverlapping(document.querySelector("#oponent"), document.querySelector("#ball"))) {
                    goX = 'left'

                    speed = (speed < 20 ? speed + 2  : speed = 20)
                }

                //MAKES THE BALL MOVES IN THE X index
                switch (goX) 
                {
                    case 'right':
                        {
                            if(isOverlapping(document.querySelector("#ball"), document.querySelector("#border-right"))) 
                            {
                                goX = 'left'
                            }
                            else { ball.css({ left: '+='+speed+'px' }) }
                        }
                        break;

                        case 'left':
                        {
                            if(isOverlapping(document.querySelector("#ball"), document.querySelector("#border-left"))) 
                            {    
                                goX = 'right'
                            }
                            else { ball.css({ left: '-='+speed+'px' }) }
                        }
                        break;
                }

                //MAKES THE BALL MOVES IN THE Y index
                switch (goY) 
                {
                    case 'top':
                    {
                        if (isOverlapping(document.querySelector("#ball"), document.querySelector("#border-top"))) 
                        {                            
                            goY = 'bottom'
                        }
                        else { ball.css({ top: '-='+inclination+'px' }) }
                    }
                    break;

                    case 'bottom':
                    {
                        if (isOverlapping(document.querySelector("#ball"), document.querySelector("#border-bottom"))) {
                            goY = 'top'
                        }
                        else { ball.css({ top: '+='+inclination+'px' }) }
                    }
                    break;
                }

            }, 10);
        }
    }
    /** **************************************************/


})