<?php
session_start();
//approche agile
//$.post/$.ajax
	function verif_ident_bd($nom, $mdp, &$resultat=array()) {
		require ('connect.php');
		$sql="SELECT * FROM `user`  where nom=:nom and mdp=:mdp";

		try {
			$commande = $pdo->prepare($sql);
			$commande->bindParam(':nom', $nom);
			$commande->bindParam(':mdp', $mdp);
			$bool = $commande->execute();

			if ($bool)
				$resultat = $commande->fetchAll(PDO::FETCH_ASSOC); //tableau d'enregistrements

			if (count($resultat)== 0) return false;
			else return true;
		}

		catch (PDOException $e) {
			echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
			die(); // On arrête tout.
		}

		if (count($resultat)== 0) return false;
			else return true;

	}

?>

