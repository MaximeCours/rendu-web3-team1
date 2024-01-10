// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

library QuizLibrary {
    struct Quiz {
        string question;
        string[4] choices;
    }
}