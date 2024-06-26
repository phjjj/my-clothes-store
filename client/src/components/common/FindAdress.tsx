/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react"
import Button from "./Button"

interface Props {
  onCompleted: (address: string) => void
}

// 다음 주소 API 스크립트 URL
const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"

function FindAddress({ onCompleted }: Props) {
  // 다음 주소 API를 호출하는 함수
  const handleOpen = () => {
    new window.daum.Postcode({
      // 주소를 찾은 후 실행할 콜백 함수
      oncomplete: (data: any) => {
        const address = data.address as string
        onCompleted(address)
      },
    }).open()
  }

  useEffect(() => {
    // 다음 주소 API 스크립트를 동적으로 로드
    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.async = true
    // script 태그를 head에 추가
    document.head.appendChild(script)

    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <Button onClick={handleOpen} type="button" size="medium" schema="primary">
      주소 찾기
    </Button>
  )
}

export default FindAddress
