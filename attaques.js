var fleurTime = 0;
var munitionDardTime = 0;
var munitionPollenTime = 0;

var timeAlea = 0;

function attaquer(time) {
	if (time>1000 && time<15000) {
		attaqueFrodon(time);
	}
	else if (time>16000 && time<25000) {
		attaque1(time);
	}
	else if (time>26000 && time<30000) {
		attaque2(time);
	}
	else if (time>31000) {
		attaqueAlea(time);
	}

	lacherFleurClose(time);

	lacherMunitionPollen(time);

	lacherMunitionDard(time);
}

var choiAttaque;
function attaqueAlea(time) {
	if (time>timeAlea) {
		timeAlea = time+10000;
		choiAttaque = Phaser.Math.Between(0, 2);
	}
	switch(choiAttaque) {
	 	case 0:
	    	attaqueFrodon(time);
	    	break;
	  	case 1:
	    	attaque1(time);
	    	break;
    	case 2:
    		attaque2(time);
    		break;
	  	default:
	    	console.log("erreur du choix d'attaque!!");
	} 
}

function lacherFleurClose(time) {
	if (time>fleurTime) {
		fleurTime = time + Phaser.Math.Between(5000, 10000);
		var fleurCible = fleursCible.create(Phaser.Math.Between(0, 800), -100, 'fleurCible');
		fleurCible.setVelocityY(50);
		fleurCible.setDepth(1);
		let random = Phaser.Math.Between(3, 6);
		fleurCible.setDisplaySize(300/random, 275/random);
		fleurCible.setAngularVelocity(100);
	}
}

function lacherMunitionPollen(time) {
	if (time>munitionPollenTime) {
		munitionPollenTime = time + Phaser.Math.Between(5000, 15000);
		var fleurOuverte = fleursOuverte.create(Phaser.Math.Between(0, 800), -100, 'fleurOuverte');
		fleurOuverte.setVelocityY(30);
		fleurOuverte.setDepth(1);
		let random = Phaser.Math.Between(3, 6);
		fleurOuverte.setDisplaySize(235/random, 230/random);
		fleurOuverte.setAngularVelocity(500);
	}
}

function lacherMunitionDard(time) {
	if (time>munitionDardTime) {
		munitionDardTime = time + Phaser.Math.Between(5000, 10000);
		var dard = dards.create(Phaser.Math.Between(0, 800), -100, 'dard');
		dard.setVelocityY(75);
		dard.setDepth(1);
		dard.setDisplaySize(45, 40);
		dard.setAngularVelocity(-100);
	}
}

var expecTime = 0;

function attaque1(time) {
	if (time>expecTime) {
		expecTime = time + 500;

		var proj = projectiles.create(Phaser.Math.Between(0, 800), 0, 'proj');
		proj.setVelocity(0, Phaser.Math.Between(50, 200));
		proj.setDepth(2);
	}
}

function attaque2(time) {
	if (time>expecTime) {
		expecTime = time + 500;

		var random =Phaser.Math.Between(0, 1);

		var proj = projectiles.create(random*1000-100, Phaser.Math.Between(-600, 0), 'proj');
		proj.setVelocity((-400*random)+200, 500);
		proj.setAccelerationY(-200);
		proj.setDepth(2);
	}
}

function attaqueFrodon(time) {
	if (time>expecTime) {
		expecTime = time + 500;
		//-300 + 800 + 300 -->  ---|--------|---

		//	  3 800	3      -->     |--------|
		//	  0		0			   |		|
		//	  0		0			   |		|
		var randomX = Phaser.Math.Between(-300, 1100);
		if (randomX<0) {
			var proj = projectiles.create(0, -randomX, 'proj');
		}
		else if (randomX<800) {
			var proj = projectiles.create(randomX, 0, 'proj');
		}
		else {
			var proj = projectiles.create(800, randomX-800, 'proj');
		}
		let distance =  Math.sqrt((player.x-proj.x)*(player.x-proj.x) + (player.y-proj.y)*(player.y-proj.y));
		proj.setVelocity((player.x-proj.x)/distance * 300, (player.y-proj.y)/distance * 300);
		proj.setDepth(2);
	}
}