import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { useState } from 'react';

const Conversation = () => {
  const { token, getUserData } = useOutletContext<RootContext>();
  const [contactName, setContactName] = useState('');
  const [content, setContent] = useState('');

  return <div>Conversation</div>;
};

export default Conversation;
