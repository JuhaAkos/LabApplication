import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Controller } from "./base.controller";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController extends Controller {
    repository = AppDataSource.getRepository(User);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);
            entity.id = null;

            entity.password = await bcrypt.hash(entity.password, 12);

            const result = await this.repository.save(entity);
            delete result.password;
            
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    login = async (req, res) => {
        try {
            const user = await this.repository.findOne({
                where: { username: req.body.username },
                select: [ 'id', 'role', 'password' ]
            });
    
            if (!user) {
                return this.handleError(res, null, 401, 'Incorrect username or password.');
            }
    
            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect username or password.');
            }
    
            const token = jwt.sign({ id: user.id, role: user.role }, 'mySecretKey', { expiresIn: '1d' });
            res.json({ accessToken: token, role: user.role, id: user.id });
        } catch (err) {
            this.handleError(res, err);
        }
    };


    //override object password here...    
    update = async (req, res) => {
        try {
            let entity = await this.repository.findOneBy({ id: req.body.id });
            if (!entity || !req.body.id) {
                return this.handleError(res, null, 404, 'No entity found with this id.');
            }
            if (!req.body.password || req.body.password==null) {
                req.body.password=entity.password
            }          
            
            entity = this.repository.create(req.body as object);

            entity.password = await bcrypt.hash(entity.password, 12);
            
            const result = await this.repository.save(entity);
 
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    }; 
}