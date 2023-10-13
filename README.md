
# wanted-pre-onboarding-backend

## **주요 기능**
사용자는 회사가 등록한 채용 공고를 검색하고 지원할 수 있습니다.
회사는 채용 공고를 등록하고 관리할 수 있습니다.
필터링 및 검색 기능을 통해 사용자는 원하는 채용 공고를 빠르게 찾을 수 있습니다.
각 채용 공고에 대한 상세 정보를 확인할 수 있습니다.

## **사용된 기술 스택**
백엔드: Node.js, Express.js
데이터베이스: MySQL,
기타: Sequelize, RESTful API

## **구현 과정**

### **1. 프로젝트 환경 설정**

Node.js 및 필요한 라이브러리 설치
-express, jest, mysql2, sequelize
데이터베이스 설정
-MySQL

### **2. DB 스키마 설계**

!(drawSQL-wanpro.png)

### **3. API 엔드포인트 설계**

#### **회사 관련 API**

채용공고 등록
'POST api/company/recruitment'

요청

    {
      "companyName": "example name",
      "country": "example country",
      "area": "example area",
      "position": "example position",
      "compensation": "example",
      "skill": "example",
      "detail": "example content"
    }

응답

    {
      "message": "채용공고 등록 완료"
    }

채용공고 수정
'PUT api/company/recruitment/:recruitmentId'

요청

    {
      "skill": "example"
    }

응답

    {
      "message": "채용공고 수정 완료."
    }

채용공고 삭제
'DELETE api/company/recruitment/:recruitmentId'

응답

    {
      "message": "채용공고 삭제 완료."
    }

#### **사용자 관련 API**

모든 채용공고 확인
'GET api/user/recruitment'

응답

    {
      "data": [
        {
          "id": 2,
          "companyName": "example",
          "country": "example",
          "area": "example",
          "position": "example",
          "compensation": "example",
          "skill": "example"
        },
        {
          "id": 3,
          "companyName": "example",
          "country": "example",
          "area": "example",
          "position": "example",
          "compensation": "example",
          "skill": "example"
        }
      ]
    }

채용공고 검색
'GET api/user/recruitment/search?keyword={keyword}'

응답

    {
      "data": [
        {
          "id": 2,
          "companyName": "example",
          "country": "example",
          "area": "example",
          "position": "example",
          "compensation": "example",
          "skill": "example"
        }
      ]
    }

채용공고 상세페이지
'GET api/user/recruitment/:recruitmentId'

응답

    {
      "data": {
        "recruitmentDetail": {
          "id": 2,
          "companyName": "example",
          "country": "example",
          "area": "example",
          "position": "example",
          "compensation": "example",
          "skill": "example"
          "detail": "example content."
        },
        "recruitmentNoticesByCompany": [
          2,
          3
        ]
      }
    }

채용공고 지원
'POST api/user/recruitment/:recruitmentId'

응답

    {
      "message": "지원 완료되었습니다."
    }

### **4. 컨트롤러 및 서비스 로직 구현**

각 API 요청을 처리하기 위한 컨트롤러 함수 작성
필요한 비즈니스 로직을 수행하는 서비스 메소드 구현
데이터베이스와의 상호작용을 위한 레포지토리 메소드 구현

### **5. 예외 처리 및 오류 핸들링 구현**

예상되는 예외 상황에 대한 처리 로직 구현
오류가 발생했을 때 적절한 응답 전송
-클라이언트에게는 일반적인 오류 메세지만 전달, console에 정확한 에러가 표시되도록 함.

### **6. 유닛 테스트 구현**

각 API 엔드포인트에 대한 유닛 테스트 작성









