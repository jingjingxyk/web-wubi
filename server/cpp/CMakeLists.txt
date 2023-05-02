cmake_minimum_required (VERSION 3.12)

project (web_wubi_server)

set(CMAKE_BUILD_TYPE Released)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_C_STANDARD 23)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++23 -Wall -g")

find_package(NGHTTP2)

add_executable(web_wubi_serve main.cc)

target_link_libraries(web_wubi_server nghttp2)
