import { formatDistanceToNow, format } from 'date-fns';

function dateFormatting(dateString) {
  const date = new Date(dateString); 
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  const isRecent = Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000; 

  return isRecent ? timeAgo : format(date, 'MMM d'); 
}

export default dateFormatting;