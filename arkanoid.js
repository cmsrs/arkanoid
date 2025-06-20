        const canvas = document.createElement("canvas");
        canvas.style.border = "2px solid black";
        document.getElementById("game_arkanoid").appendChild(canvas);
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext("2d");


        // **********Game properties - start****************

        // Paddle properties
        const paddle = {
            width: 100,
            height: 10,
            x: canvas.width / 2 - 50,
            y: canvas.height - 30,
            speed: 5,
            dx: 0
        };

        // Ball properties
        const ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 8,
            speed: 4,
            dx: 4,
            dy: -4
        };
		
		function resetBallAndPaddle() {
			paddle.x = canvas.width / 2 - paddle.width / 2;
			ball.x = canvas.width / 2;
			ball.y = canvas.height / 2;
			ball.dx = 4;
			ball.dy = -4;
		}
		

        // Bricks
        const brickWidth = 75;
        const brickHeight = 20;
        const brickPadding = 10;
        const brickOffsetTop = 60;
        const brickOffsetLeft = 30;
		
		let level = 0;
		let bricksLeft = 0;

        let lives = 3;
        let showLifeLostMessage = false;
        let lifeLostTimer = 0;    
        
        let showGameOver = false;
        let gameOverTimer = 60; // np. 2 sekundy przy 60 FPS
        
        let showVictory = false;
        let victoryTimer = 180; // 3 sekundy przy 60 FPS


        const bricks = [


            [
                // Wiersz 0
                [
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 1 }
                ],
                // Wiersz 1
                [
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 }
                ],
                // Wiersz 2
                [
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 }
                ],
                // Wiersz 3
                [
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 0 }
                ],
                // Wiersz 4
                [
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 0 }
                ],
                // Wiersz 5
                [
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 1 },
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 0 },
                    { x: 0, y: 0, status: 0 }
                ]
            ],    

			[
				[
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 }								

				],
				[
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 2 }
				],
				[
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 }
				],
				[
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 }
				],

				[
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 2 }				
				]
			],			
			[
				[
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 }								

				],
				[
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 }
				],
				[
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 }
				],
				[
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 1 }
				],

				[
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 2 },
					{ x: 0, y: 0, status: 2 }				
				]
			],

            
            [
                [
                    { x: 0, y: 0, status: 2 }, 
                    { x: 0, y: 0, status: 2 }, 
                    { x: 0, y: 0, status: 2 }, 
                    { x: 0, y: 0, status: 2 }, 
                    { x: 0, y: 0, status: 2 }, 
                    { x: 0, y: 0, status: 2 },
                ],
                [
                    { x: 0, y: 0, status: 2 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 2 },
                ],
                [
                    { x: 0, y: 0, status: 2 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 2 },
                ],
                [
                    { x: 0, y: 0, status: 2 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 2 },
                ],
                [
                    { x: 0, y: 0, status: 2 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 1 }, 
                    { x: 0, y: 0, status: 2 },
                ],
                [
                    { x: 0, y: 0, status: 0 }, 
                    { x: 0, y: 0, status: 0 }, 
                    { x: 0, y: 0, status: 0 }, 
                    { x: 0, y: 0, status: 0 }, 
                    { x: 0, y: 0, status: 0 }, 
                    { x: 0, y: 0, status: 0 },
                ]
            ]


        ];        

        
        const bricks_tmp = [
			[
				[
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 1 }								

				]
            ],

			[
				[
					{ x: 0, y: 0, status: 1 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 0 },
					{ x: 0, y: 0, status: 1 }								

				]
            ]

        ];
        


        // ***************Game properties - stop****************
		
        // Draw paddle
        function drawPaddle() {
            ctx.fillStyle = "blue";
            ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        }

        // Draw ball
        function drawBall() {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }

        // Draw bricks
        function drawBricks() {			
            bricks[level].forEach((row, r) => {
                row.forEach((brick, c) => {
                    if (brick.status > 0) {
                        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                        brick.x = brickX;
                        brick.y = brickY;

                        if (brick.status === 1) {
                            ctx.fillStyle = "green";
                        } else if (brick.status === 2) {
                            ctx.fillStyle = "yellow";
                        }                        
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                    }
                });
            });
        }

        // Move paddle
        function movePaddle() {
            paddle.x += paddle.dx;
            if (paddle.x < 0) paddle.x = 0;
            if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
        }

        // Move ball
        function moveBall() {
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Wall collision (left/right)
            if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
                ball.dx *= -1;
            }

            // Wall collision (top)
            if (ball.y - ball.radius < 0) {
                ball.dy *= -1;
            }

            // Paddle collision
            //if (ball.x > paddle.x && ball.x < paddle.x + paddle.width &&
            //    ball.y + ball.radius > paddle.y) {
            //    ball.dy *= -1;
            //}

            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width &&
                ball.y + ball.radius > paddle.y) {

                const hitPos = ball.x - (paddle.x + paddle.width / 2);
                ball.dx = hitPos * 0.1 + (Math.random() - 0.5); // efekt rotacji + losowość
                ball.dy *= -1;

                // Przyspieszenie piłki (do pewnego limitu)
                const speedIncrease = 0.5;
                const maxSpeed = 8;

                // oblicz aktualną prędkość
                const currentSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

                // zwiększ prędkość, jeśli poniżej limitu
                if (currentSpeed < maxSpeed) {
                    const factor = (currentSpeed + speedIncrease) / currentSpeed;
                    ball.dx *= factor;
                    ball.dy *= factor;
                }
            }            

            // Brick collision
			bricksLeft = 0;
            bricks[level].forEach(row => {
                row.forEach(brick => {
                    if (brick.status === 1  || brick.status === 2) {
                        if (ball.x > brick.x && ball.x < brick.x + brickWidth &&
                            ball.y > brick.y && ball.y < brick.y + brickHeight) {
                            ball.dy *= -1;
                            if (brick.status === 1) {
                                brick.status = 0; // tylko cegiełki zbijalne znikają                
                            }
                        }
                    }
					if (brick.status === 1 ){
						bricksLeft++;
					}					
                });
            });

			// Przejście na nowy poziom
			if (bricksLeft === 0) {
				level++;
				if (level >= bricks.length) {
                    level = 0; 
                    setTimeout(() => {
					    document.location.reload();
                    }, 600);

				} else {
					resetBallAndPaddle();
                    //showLifeLostMessage = true;
                    //lifeLostTimer = 60; // ~1 sekunda                    
				}
			}

            // Limit maksymalnej prędkości
            const maxSpeed = 6;

            const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
            if (speed > maxSpeed) {
                const scale = maxSpeed / speed;
                ball.dx *= scale;
                ball.dy *= scale;
            }            

            // Game over (bottom collision)
            if (ball.y + ball.radius > canvas.height) {
                lives--;
                if (lives <= 0) {
                    showGameOver = true;
                    gameOverTimer = 60;
                    //alert("Game over! You've lost all your lives.");
                    //setTimeout(() => {
                    //    document.location.reload();
                    //}, 100);
                } else {
                    showLifeLostMessage = true;
                    lifeLostTimer = 60;
                }
            }
        }

        function drawHUD() {
            // tlo paska HUD
            ctx.fillStyle = "#f0f0f0";
            ctx.fillRect(0, 0, canvas.width, 50);

            // Tekst poziomu i zyc
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.fillText("Level: " + (level + 1), 10, 30);
            ctx.fillText("Lives: " + lives, 120, 30);
        }


        // Update game frame
        function update() {
            //movePaddle();
            //moveBall();
            movePaddle();
            if (!showLifeLostMessage) {
                moveBall();
            }

            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.fillText("Level: " + (level + 1), 10, 20);
            ctx.fillText("Lives: " + lives, 10, 40);   

            // Wiadomosc o stracie zycia
            drawHUD();

            if (showLifeLostMessage) {
                ctx.font = "24px Arial";
                ctx.fillStyle = "red";
                ctx.fillText("You died.", canvas.width / 2 - 80, canvas.height / 2);
                lifeLostTimer--;
                if (lifeLostTimer <= 0) {
                    showLifeLostMessage = false;
                    resetBallAndPaddle();
                }
            } 
            
            if (showGameOver) {
                ctx.font = "28px Arial";
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvas.width, canvas.height); // tło dla widoczności
                ctx.fillStyle = "white";
                ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
                gameOverTimer--;
                if (gameOverTimer <= 0) {
                    document.location.reload(); // lub resetGame()
                }
            } 

            // Tworzymy przycisk dynamicznie
            // const restartBtn = document.createElement('button');
            // restartBtn.id = 'restartBtn';
            // restartBtn.textContent = 'Restart';
            // restartBtn.style.display = 'none';  // Ukrywamy go na start

            // // Dodajemy go do body (lub innego kontenera)
            // document.getElementById('game').appendChild(restartBtn);

            // // Obsługa kliknięcia na przycisk
            // restartBtn.addEventListener('click', () => {
            //     location.reload();
            // });            
            // if (showVictory) {
            //     ctx.font = "28px Arial";
            //     ctx.fillStyle = "green";
            //     ctx.fillRect(0, 0, canvas.width, canvas.height); // zielone tło zwycięstwa
            //     ctx.fillStyle = "white";
            //     ctx.fillText("You Win!, Restart", canvas.width / 2 - 70, canvas.height / 2);

            //     level = 0;

            //     canvas.style.cursor = 'pointer'; // pokaż, że można kliknąć
            //     canvas.addEventListener('click', () => {
            //         document.location.reload();
            //     }, { once: true }); // listener działa tylko raz


            //     //showVictory = false; 
            //     //restartBtn.style.display = 'block';
            //     //restartBtn.style.display = 'inline-block';
            // } else {
            //     //restartBtn.style.display = 'none';
            //     canvas.style.cursor = 'default';
            // }
            

            // Draw everything            
            drawBricks();

            drawPaddle();
            drawBall();
			
			//console.log('bricksLeft=' + bricksLeft);
            requestAnimationFrame(update);
        }

        canvas.addEventListener("touchstart", handleTouch);
        canvas.addEventListener("touchmove", handleTouch);

        function handleTouch(e) {
            const touchX = e.touches[0].clientX;

            // Przesuń paletkę do miejsca dotyku (lub tylko w jego kierunku)
            if (touchX < canvas.width / 2) {
                paddle.dx = -paddle.speed;
            } else {
                paddle.dx = paddle.speed;
            }

            // Zatrzymaj ruch po dotknięciu tylko raz
            e.preventDefault();
        }

        canvas.addEventListener("touchend", () => {
            paddle.dx = 0;
        });


        // Keyboard events
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") paddle.dx = paddle.speed;
            if (e.key === "ArrowLeft") paddle.dx = -paddle.speed;
        });

        document.addEventListener("keyup", () => {
            paddle.dx = 0;
        });

        function resizeCanvas() {
            const scale = Math.min(window.innerWidth / 800, window.innerHeight / 600);
            canvas.style.width = `${800 * scale}px`;
            canvas.style.height = `${500 * scale}px`;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // uruchom przy starcie        

        // Start game
        update();

