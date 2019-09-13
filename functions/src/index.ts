'use strict';

import {Request} from "firebase-functions/lib/providers/https";

const functions = require('firebase-functions');
const _admin = require('firebase-admin');
import * as express from "express";
import * as admin from "firebase-admin";
import Reference = admin.database.Reference;

admin.initializeApp();

export const inc = functions.https.onRequest((request: Request, response: express.Response) => {
    let id: String = request.path.substring(1);
    let dbRef: Reference = _admin.database().ref('/' + id + '/');

    return dbRef.once('value', (snapshot) => {
        var count: number = snapshot.val();
        if (count == null) {
            response.send("1");
            return dbRef.set(1);
        } else {
            let result: number = count + 1;
            response.send(result.toString());
            return dbRef.set(result);
        }
    });
});
