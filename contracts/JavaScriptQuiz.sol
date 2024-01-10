// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./QuizLibrary.sol";

contract JavaScriptQuiz {
    using QuizLibrary for QuizLibrary.Quiz[];

    Quiz[] public quizzes;

    bytes32 private answerHash;
    address private owner;

    event CorrectAnswer(address responder);
    event WrongAnswer(address responder);

    constructor(bytes32[] _answerHash) {
        owner = msg.sender;
        answerHash = _answerHash;
        quizzes.push(QuizLibrary.Quiz({
            question: "Quel est le principal objectif du Web 3.0 ?",
            choices: [
        "Améliorer la vitesse de connexion Internet.",
        "Décentraliser les applications et les données.",
        "Augmenter la résolution des écrans d'ordinateur.",
        "Réduire la taille des fichiers multimédias."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: "Qu'est-ce qu'un smart contract ?",
            choices: [
        "Un contrat intelligent entre deux entreprises.",
        "Un document juridique traditionnel.",
        "Un accord verbal entre parties contractantes.",
        "Un programme informatique auto-exécutable sur une blockchain."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: "Quelle blockchain est principalement associée à l'utilisation de smart contracts ?",
            choices: [
        "Bitcoin.",
        "Ethereum.",
        "Ripple.",
        "Litecoin."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: "Comment fonctionne la décentralisation dans le contexte du Web 3.0 ?",
            choices: [
        "Les données sont réparties sur plusieurs nœuds sans contrôle central.",
        "Toutes les données sont stockées sur un seul serveur.",
        "Un seul utilisateur a le contrôle total du réseau.",
        "Les données sont stockées uniquement sur des serveurs gouvernementaux."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: "Quelle est la caractéristique principale d'un smart contract par rapport à un contrat traditionnel ?",
            choices: [
        "Il nécessite une signature manuscrite.",
        "Il est exécuté automatiquement sans intermédiaire.",
        "Il peut être annulé à tout moment.",
        "Il est stocké sur une base de données centralisée."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: "Quel langage de programmation est souvent utilisé pour écrire des smart contracts ?",
            choices: [
        "Python.",
        "JavaScript.",
        "Solidity.",
        "Ruby."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: "Qu'est-ce que Hardhat dans le contexte du développement de smart contracts ?",
            choices: [
        "Un environnement de développement pour Ethereum.",
        "Une casquette résistante.",
        "Un protocole de sécurité sur Internet.",
        "Un langage de programmation."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: "Quel est le rôle principal de MetaMask dans l'écosystème Ethereum ?",
            choices: [
        "Gérer les mots de passe des utilisateurs.",
        "Faciliter l'échange de cryptomonnaies.",
        "Fournir une interface utilisateur pour les smart contracts.",
        "Stocker des fichiers sur la blockchain."
        ]
        }));

        quizzes.push(QuizLibrary.Quiz({
            question: "Qu'est-ce que Sepolia dans le contexte du Web 3.0 ?",
            choices: [
        "Un réseau social décentralisé.",
        "Un langage de programmation blockchain.",
        "Un portefeuille électronique.",
        "Un nouveau protocole de communication."
        ]
        }));

    }

    function answerQuiz(string memory _response) public {
        require(msg.sender != owner, "Owner cannot answer the quiz.");
        if (keccak256(abi.encodePacked(_response)) == answerHash) {
            emit CorrectAnswer(msg.sender);
        } else {
            emit WrongAnswer(msg.sender);
        }
    }

    function updateQuiz(
        string memory _newQuestion,
        string[4] memory _newChoices,
        bytes32 _newAnswerHash
    ) public {
        require(msg.sender == owner, "Only owner can update the quiz.");
        question = _newQuestion;
        choices = _newChoices;
        answerHash = _newAnswerHash;
    }
}
