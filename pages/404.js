import Oops from "../components/Oops/Oops";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/main");
    }, 3000);
  }, []);

  return (
    <div className='notFound'>
      <h1>Такой страницы не существует</h1>
      <p>
        Перехожу на{" "}
        <Link href='/main'>
          <a>главную страницу</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
