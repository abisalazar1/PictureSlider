/*
 By Abi Salazar, www.abisalazar.co.uk
 Available for use under the MIT License
 */


(function( $ ) {
    $.fn.ImageSlider = function() {

        var image = this;
        image.parent().addClass('imageSlider__parentContainer');
        if(image.parent().hasClass('imageSlider__parentContainer')){
            image.addClass('imageSlider__image');
            var NextBtn;
            var PreviousBtn;
            var moveX;
            var startX = function () {
                matrix = image.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
                return matrix[4];
            }
            var HideBtns = function (Next){
                NextBtn.hide();
                PreviousBtn.hide();
                $(image).onCSSTransitionEnd( function()
                {
                    if(Next >= 0){
                        PreviousBtn.hide();
                    }else{
                        PreviousBtn.show();
                    }
                    if(Next <= -Math.abs(imageWidth())){
                        NextBtn.hide();
                    }else{
                        NextBtn.show();
                    }

                });

            }
            var imageWidth = function (){
                return image.width() - ContainerWidth();
            }
            var ContainerWidth = function () {
                return image.parent().width();
            }
            var AddBtns = function () {
                var BtnContainer = $("<div class='imageSlider__btnContainer'/>");
                NextBtn = $("<i class='imageSlider__nextBtn imageSlider__btn'/>");
                PreviousBtn = $("<i class='imageSlider__previousBtn imageSlider__btn'/>");
                image.parent().append(BtnContainer);
                BtnContainer.append(PreviousBtn);
                BtnContainer.append(NextBtn);
                NextBtn.html('&#8250;');
                PreviousBtn.html('&#8249;');
            }
            var MovementByBtn = function () {
                NextBtn.on('click',function(){
                    var Next = parseInt(startX()) - ContainerWidth();
                    HideBtns(Next);
                    if(Next < -Math.abs(imageWidth())){
                        Next = -Math.abs(imageWidth());
                    }
                    image.css('transform','translateX('+Next+'px)');
                });
                PreviousBtn.on('click',function(){

                    var Next = parseInt(startX()) + ContainerWidth();
                    HideBtns(Next);
                    if(Next > 0){
                        Next = 0;
                    }
                    image.css('transform','translateX('+Next+'px)');
                });
            }
            AddBtns();
            MovementByBtn();
            PreviousBtn.hide();
            if(jQuery().swipe){
                $(image).swipe({
                    swipeStatus:function (event, phase, direction, distance) {
                        if(phase == 'start'){
                            startTime  = event.timeStamp;
                        }

                        if (phase == "move"){

                            if (direction === 'left' || direction === 'right') {
                                var s = direction === 'left' ? -1 : 1;

                            }
                            moveX = parseInt((startX())) + (distance * s);
                            if(moveX > 0){
                                moveX = 0;
                            }else if(moveX < -imageWidth()){
                                moveX = -imageWidth();
                            }
                        }

                        if(phase == "end"){
                            endtime = event.timeStamp - startTime;

                            duration = moveX / endtime;
                            var inertiaDuration = 2;
                            var inertiaDistance = (duration * inertiaDuration) / 5;
                            var speed = Math.abs(inertiaDistance).toFixed(1);
                            if(speed < 1){
                                speed = 1;
                            }
                            if(speed > 3){
                                speed = 3;
                            }
                            console.log(moveX);
                            $(this).css("transition-duration", speed+ "s");
                            //inverse the number we set in the css
                            var value = (moveX < 0 ? "" : "-") + Math.abs(moveX).toString();

                            image.css("transform", "translateX(" + moveX + "px)");
                            if(moveX != 0 && moveX != -imageWidth()){
                                console.log('moveX '+ moveX);
                                console.log(-imageWidth());
                                HideBtns(moveX);
                            }
                            if(moveX == 0){
                                PreviousBtn.hide();
                            }
                            if(moveX == -imageWidth()){
                                NextBtn.hide();
                            }

                        }

                    },
                    threshold: 80,
                    triggerOnTouchLeave:true

                });
            }
            return this;
        }


    }
}( jQuery ));

