/*
=======================================================
  Title: jeanBaptiste-team-routes.js
  Author: Sarah Jean Baptiste
  Date: 07/18/2021
  Description: Team Routes API
========================================================
*/

// Requirement statements. 
const express = require('express');
const Team = require("../models/jeanBaptiste-team.js");
const router = express.Router();

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning an array of teams.
 *     summary: returns an array of teams in JSON format.
 *     responses:
 *       '200':
 *         description: array of team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

 router.get('/teams', async(req, res) => {
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(teams);
                res.json(teams);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for adding a new player document to MongoDB Atlas
 *     summary: Creates a new player document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id to filter the collection by. 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Team information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *              firstName:
 *                 type: string
 *              lastName:
 *                 type: string
 *              salary:
 *                 type: number
 * 
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/teams/:id/players', async(req, res) => {
    try {
        const newPlayer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salary: req.body.salary
        }
        Team.findOne({'_id': req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else if (!team){
                res.status(401).send({
                    'message': `Team not found: ${req.params.id}`
                })
            } else {
                team.players.push(newPlayer);
                Team.updateOne(team, function(error, updatedTeam){
                    if (err) {
                        console.log(err);
                        res.status(500).send({
                            'message': `MongoDB Exception: ${err}`
                        })
                    } else {
                        console.log(team);
                        res.json(team);
                    }
                }); 
                
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API for returning all player documents for a team
 *     summary: returns all player documents for a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.get('/teams/:id/players', async(req, res) => {
    try {
        Team.findOne({'_id': req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else if (!team){
                res.status(401).send({
                    'message': `Team not found: ${req.params.id}`
                })
            } else {
                console.log(team.players);
                res.json(team.players);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeam
 *     description: API for deleting a document from MongoDB.
 *     summary: Removes a document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.delete('/teams/:id', async (req, res) => {
    try {
        const teamsDocId = req.params.id;

        Team.findByIdAndDelete({'_id': teamsDocId}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else if (!team){
                res.status(401).send({
                    'message': `Team not found: ${req.params.id}`
                })
            } else {
                console.log(team);
                res.json(team);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


module.exports = router 