import React from 'react';

const CustomLink = React.forwardRef(({ onClick, href, onCustomClick, children, ...rest }, ref) => {
  const handleClick = event => {
    if (onClick) {
      onClick(event);
    }
    if (onCustomClick) {
      onCustomClick(event);
    }
  };

  return (
    <a href={href} onClick={handleClick} ref={ref} {...rest}>
      {children}
    </a>
  );
});

export default CustomLink;
