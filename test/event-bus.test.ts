import { EventBus } from '📦/event-bus';
import { Holder } from '📦/one-time-excution/holder';
import { noop } from '🛠️';

test('', async () => {
  // 비동기 제어를 위한 홀더
  const holder = new Holder();

  const exitTest = holder.resolve;

  type Node = {
    tag: 'div' | 'span' | 'button';
    id: string;
  };

  type Events = {
    click: {
      target: Node;
      preventDefault: () => void;
    };
  };

  const LoginButton: Node = {
    tag: 'button',
    id: 'login-btn'
  };

  const Manager = new EventBus<Events>();

  Manager.on('click', event => {
    console.log(
      `'<${event.target.tag} id="${event.target.id}"/>' on Click Event `
    );
    expect(event.target).toBe(LoginButton);
    exitTest();
  });

  setTimeout(() => {
    Manager.emit('click', {
      target: LoginButton,
      preventDefault: noop
    });
  }, 3000);

  await holder.promise;
});
