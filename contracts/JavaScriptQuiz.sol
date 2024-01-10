// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./QuizLibrary.sol";

contract JavaScriptQuiz {
    using QuizLibrary for QuizLibrary.Quiz[];

    QuizLibrary.Quiz[] public quizzes;

    bytes32[] private answerHash;
    address private owner;

    event CorrectAnswer(address responder);
    event WrongAnswer(address responder, uint goodAnswers);

    constructor(bytes32[] memory _answerHash) {
        owner = msg.sender;
        answerHash = _answerHash;
        quizzes.push(QuizLibrary.Quiz({
            question: unicode"Qu'est-ce que le Web 3.0 ?",
            choices: [
        unicode"Une version améliorée du navigateur Internet Explorer.",
        unicode"Un réseau social populaire.",
        unicode"Un nouveau protocole de communication pour le courrier électronique.",
        unicode"Une évolution du Web vers un Internet décentralisé."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: unicode"Quel est le principal objectif du Web 3.0 ?",
            choices: [
        unicode"Améliorer la vitesse de connexion Internet.",
        unicode"Décentraliser les applications et les données.",
        unicode"Augmenter la résolution des écrans d'ordinateur.",
        unicode"Réduire la taille des fichiers multimédias."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: unicode"Qu'est-ce qu'un smart contract ?",
            choices : [
        unicode"Un contrat intelligent entre deux entreprises.",
        unicode"Un document juridique traditionnel.",
        unicode"Un accord verbal entre parties contractantes.",
        unicode"Un programme informatique auto-exécutable sur une blockchain."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: unicode"Comment fonctionne la décentralisation dans le contexte du Web 3.0 ?",
            choices: [
        unicode"Les données sont réparties sur plusieurs nœuds sans contrôle central.",
        unicode"Toutes les données sont stockées sur un seul serveur.",
        unicode"Un seul utilisateur a le contrôle total du réseau.",
        unicode"Les données sont stockées uniquement sur des serveurs gouvernementaux."
        ]
        }));

        quizzes.push(QuizLibrary. Quiz({
            question : unicode"Comment fonctionne la décentralisation dans le contexte du Web 3.0 ?",
            choices : [
        unicode"Les données sont réparties sur plusieurs nœuds sans contrôle central.",
        unicode"Toutes les données sont stockées sur un seul serveur.",
        unicode"Un seul utilisateur a le contrôle total du réseau.",
        unicode"Les données sont stockées uniquement sur des serveurs gouvernementaux."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question : unicode"Quelle est la caractéristique principale d'un smart contract par rapport à un contrat traditionnel ?",
            choices : [
        unicode"Il nécessite une signature manuscrite.",
        unicode"Il est exécuté automatiquement sans intermédiaire.",
        unicode"Il peut être annulé à tout moment.",
        unicode"Il est stocké sur une base de données centralisée."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question : unicode"Quel langage de programmation est souvent utilisé pour écrire des smart contracts ?",
            choices : [
        unicode"Python.",
        unicode"JavaScript.",
        unicode"Solidity.",
        unicode"Ruby."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question : unicode"Qu'est-ce que Hardhat dans le contexte du développement de smart contracts ?",
            choices : [
        unicode"Un environnement de développement pour Ethereum.",
        unicode"Une casquette résistante.",
        unicode"Un protocole de sécurité sur Internet.",
        unicode"Un langage de programmation."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question : unicode"Quel est le rôle principal de MetaMask dans l'écosystème Ethereum ?",
            choices : [
        unicode"Gérer les mots de passe des utilisateurs.",
        unicode"Faciliter l'échange de cryptomonnaies.",
        unicode"Fournir une interface utilisateur pour les smart contracts.",
        unicode"Stocker des fichiers sur la blockchain."
        ]
        }));
        quizzes.push(QuizLibrary.Quiz({
            question : unicode"Qu'est-ce que Sepolia dans le contexte du Web 3.0 ?",
            choices : [
        unicode"Un réseau social décentralisé.",
        unicode"Un langage de programmation blockchain.",
        unicode"Un portefeuille électronique.",
        unicode"Un nouveau protocole de communication."
        ]
        }));
    }

    function answerQuiz(string[] memory _responses) public {
        uint goodResultCount = 0;
        for (uint i = 0; i < _responses.length; i++) {
            if (keccak256(abi.encodePacked(_responses[i])) == answerHash[i]) {
                goodResultCount++;
            }
        }

        if (goodResultCount == _responses.length) {
            emit CorrectAnswer(msg.sender);
        } else {
            emit WrongAnswer(msg.sender, goodResultCount);
        }
    }
}
