import RidesService from '../services/rides.service.js';
import RidesController from '../controllers/ridesController.js'; 

const ridesService = new RidesService();
const ridesController = new RidesController(ridesService);

export { ridesController, ridesService };