import User from '../models/User';
import Notification from '../schemas/Notification';
import { async } from 'rxjs/internal/scheduler/async';
import { updateLocale } from 'moment';

class NotificationController {
  async index(req, res) {
    /**
     *  Check if provider_id is a provider
     */
    const ckeckIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!ckeckIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  /**
   * Method Update of Notify
   */
  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
