import './Badge.scss';
import BacklogIcon from './assets/backlog.png';
import InProgressIcon from './assets/in-progress.png';
import DoneIcon from './assets/done.png';
import CancelledIcon from './assets/canceled.png';
import NewIcon from './assets/new.png';

export type BadgeStatus = 'inProgress' | 'done' | 'backlog' | 'cancelled';
export type BadgeFormat = 'icon' | 'text';
export interface IBadge {
  status?: BadgeStatus;
  format: BadgeFormat;
}

const generateContent = (status?: BadgeStatus) => {
  let title = "NEW";
  let icon = NewIcon;
  if (status){
    switch (status) {
      case "backlog":
        icon = BacklogIcon;
        title = "BACKLOG";
        break;
      case "inProgress":
        icon = InProgressIcon;
        title = "IN PROGRESS";
        break;
      case "done":
        icon = DoneIcon;
        title = "DONE";
        break;
      case "cancelled":
        icon = CancelledIcon;
        title = "CANCELLED";
        break;
      default:
        title = "NEW";
        icon = NewIcon;
    }
  }

  return {title, icon}
}
const Badge = ({status, format}:IBadge) => {
  const {title, icon} = generateContent(status);
  return (
    <div className={`badge badge_${status} badge_${format === 'icon'? 'icon': 'text' }`}>
      {format === 'text'? title : (<img src={icon} alt={title} title={title} />) }
    </div>
  );
};

export default Badge;