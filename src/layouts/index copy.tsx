import { Nav, Text } from 'components';

export function Layout(props) {
  return (
    <div className="bg-gradient2  flex flex-col font-dungeon items-center justify-start mx-auto pb-[22px] w-full" style = {{
      height: '100vh'
  }}>
      <Nav />
      <div className="flex flex-col p-24  h-full   items-center justify-between  w-full">
        {props.children}
      </div>
      <Text
        className="text-center text-shadow-ts text-white-A700 text-xs uppercase w-auto"
        size="txtBackto198212"
      >
        Alright Reserved X0gies
      </Text>
    </div>
  );
}
