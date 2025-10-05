#!/usr/bin/env python3
"""
이미지 최적화 스크립트
웹용으로 이미지 크기와 용량을 줄입니다.
"""

from PIL import Image
import os
from pathlib import Path

# 설정 (브라우저 멈춤 방지를 위한 극도 최적화)
INPUT_DIR = "/Users/user/Git/yw-first-birthday/photo"
OUTPUT_DIR = "/Users/user/Git/yw-first-birthday/photo-optimized"
MAX_WIDTH = 600  # 최대 너비 (픽셀) - 800 → 600으로 추가 축소
QUALITY = 50  # JPEG 품질 (0-100, 50으로 추가 축소)

def optimize_image(input_path, output_path):
    """이미지를 최적화합니다."""
    try:
        with Image.open(input_path) as img:
            # EXIF 방향 정보 적용
            if hasattr(img, '_getexif') and img._getexif() is not None:
                exif = dict(img._getexif().items())
                if 274 in exif:  # Orientation tag
                    if exif[274] == 3:
                        img = img.rotate(180, expand=True)
                    elif exif[274] == 6:
                        img = img.rotate(270, expand=True)
                    elif exif[274] == 8:
                        img = img.rotate(90, expand=True)
            
            # 원본 크기
            original_width, original_height = img.size
            
            # 리사이즈가 필요한 경우
            if original_width > MAX_WIDTH:
                ratio = MAX_WIDTH / original_width
                new_height = int(original_height * ratio)
                img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                print(f"  리사이즈: {original_width}x{original_height} -> {MAX_WIDTH}x{new_height}")
            else:
                print(f"  크기 유지: {original_width}x{original_height}")
            
            # RGB로 변환 (JPEG는 RGBA 지원 안함)
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # 저장
            img.save(output_path, 'JPEG', quality=QUALITY, optimize=True)
            
            # 파일 크기 비교
            original_size = os.path.getsize(input_path) / 1024 / 1024  # MB
            optimized_size = os.path.getsize(output_path) / 1024 / 1024  # MB
            reduction = (1 - optimized_size / original_size) * 100
            
            print(f"  용량: {original_size:.2f}MB -> {optimized_size:.2f}MB (감소: {reduction:.1f}%)")
            
    except Exception as e:
        print(f"  ❌ 오류: {str(e)}")

def main():
    """메인 함수"""
    # 입력 디렉토리 확인
    if not os.path.exists(INPUT_DIR):
        print(f"❌ 입력 폴더를 찾을 수 없습니다: {INPUT_DIR}")
        return
    
    # 출력 디렉토리 생성
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"✅ 출력 폴더: {OUTPUT_DIR}\n")
    
    # 이미지 파일 확장자
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}
    
    # 이미지 파일 찾기
    image_files = []
    for file in os.listdir(INPUT_DIR):
        if Path(file).suffix.lower() in image_extensions:
            image_files.append(file)
    
    if not image_files:
        print("❌ 이미지 파일을 찾을 수 없습니다.")
        return
    
    print(f"📷 총 {len(image_files)}개의 이미지를 처리합니다.\n")
    print(f"설정: 최대 너비 {MAX_WIDTH}px, 품질 {QUALITY}%\n")
    print("-" * 60)
    
    # 각 이미지 최적화
    for idx, filename in enumerate(image_files, 1):
        input_path = os.path.join(INPUT_DIR, filename)
        # 출력 파일명 (.jpg로 통일)
        output_filename = Path(filename).stem + '.jpg'
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        
        print(f"\n[{idx}/{len(image_files)}] {filename}")
        optimize_image(input_path, output_path)
    
    print("\n" + "=" * 60)
    print("✅ 최적화 완료!")
    print(f"📁 최적화된 이미지 위치: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()