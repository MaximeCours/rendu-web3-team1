// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JavaScriptQuiz {
    string public question =
    "Quel est le resultat de '2' + '3' en JavaScript ?";
    string[4] public choices = ["23", "5", "undefined", "Error"];

    bytes32 private answerHash;
    address private owner;

    event CorrectAnswer(address responder);
    event WrongAnswer(address responder);

    constructor(bytes32 _answerHash) {
        owner = msg.sender;
        answerHash = _answerHash;
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
