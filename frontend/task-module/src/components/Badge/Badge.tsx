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

const BacklogIconUrl = new URL(BacklogIcon, import.meta.url);
const InProgressIconUrl = new URL(InProgressIcon, import.meta.url);
const DoneIconUrl = new URL(DoneIcon, import.meta.url);
const CancelledIconUrl = new URL(CancelledIcon, import.meta.url);
const NewIconUrl = new URL(NewIcon, import.meta.url);

const generateContent = (status?: BadgeStatus) => {
  let title = "NEW";
  let icon: URL | string = NewIcon;
  if (status){
    switch (status) {
      case "backlog":
        icon = BacklogIconUrl.href;
        title = "BACKLOG";
        break;
      case "inProgress":
        icon = InProgressIconUrl.href;
        title = "IN PROGRESS";
        break;
      case "done":
        icon = DoneIconUrl.href;
        title = "DONE";
        break;
      case "cancelled":
        icon = CancelledIconUrl.href;
        title = "CANCELLED";
        break;
      default:
        title = "NEW";
        icon = NewIconUrl.href;
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