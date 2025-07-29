import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import { FiExternalLink } from 'react-icons/fi';

const Button = ({ href, onClick, children, classes, type, target, rel, withIcon, ...otherProps }) => {
  const buttonClass = type === 'primary' 
    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
    : 'border-2 border-purple-500 hover:border-purple-600 hover:bg-purple-500/10';

  const Tag = href ? 'a' : 'button';

  let additionalClasses = "";
  if (classes) {
    additionalClasses = classes;
  }

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`${buttonClass} px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 flex items-center gap-2 ${additionalClasses}`}
      target={target}
      rel={rel}
      {...otherProps}
    >
      {children}
      {withIcon && <FiExternalLink className="w-4 h-4" />}
    </Tag>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  classes: PropTypes.string,
  type: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  withIcon: PropTypes.bool,
};

export default Button;
