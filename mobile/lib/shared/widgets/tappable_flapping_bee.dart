import 'dart:math' show min;

import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

/// The Accenture Connect ">" chevron mark (the official Accenture glyph) that
/// briefly pulses when tapped.
///
/// (Previously a bee silhouette with fluttering wings; retired with the bee
/// theme.) When reduced motion is enabled, the mark stays static.
class TappableFlappingBee extends HookConsumerWidget {
  /// The rendered width of the complete mark.
  final double width;

  /// The color used for the chevron.
  final Color color;

  const TappableFlappingBee({
    required this.width,
    required this.color,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final animation = useAnimationController(
      duration: const Duration(milliseconds: 480),
    );
    final reducedMotion = MediaQuery.disableAnimationsOf(context);

    void pulse() {
      if (reducedMotion) return;
      animation.forward(from: 0);
    }

    return Semantics(
      button: true,
      label: 'Accenture Connect',
      hint: 'Tap to animate the logo',
      onTap: pulse,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        excludeFromSemantics: true,
        onTap: pulse,
        child: RepaintBoundary(
          child: AnimatedBuilder(
            animation: animation,
            builder: (context, _) {
              // A single gentle scale pulse on tap (0 -> peak -> 0).
              final pulseAmount = 0.08 * (1 - (2 * animation.value - 1).abs());
              return CustomPaint(
                size: Size(width, width * 12.77 / 12.08),
                painter: _ChevronMarkPainter(
                  color: color,
                  scaleBoost: pulseAmount,
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}

class _ChevronMarkPainter extends CustomPainter {
  final Color color;
  final double scaleBoost;

  const _ChevronMarkPainter({required this.color, required this.scaleBoost});

  @override
  void paint(Canvas canvas, Size size) {
    final baseScale = min(size.width / 12.08, size.height / 12.77);
    final scale = baseScale * (1 + scaleBoost);
    final renderedWidth = 12.08 * scale;
    final renderedHeight = 12.77 * scale;

    canvas
      ..save()
      ..translate(
        (size.width - renderedWidth) / 2,
        (size.height - renderedHeight) / 2,
      )
      ..scale(scale);

    // Official Accenture ">" chevron, normalized to a 12.08 x 12.77 box.
    final chevron = Path()
      ..moveTo(0, 9.02)
      ..lineTo(7.05, 6.4)
      ..lineTo(0, 3.65)
      ..lineTo(0, 0)
      ..lineTo(12.07, 4.85)
      ..lineTo(12.08, 7.88)
      ..lineTo(0.01, 12.77)
      ..close();

    canvas
      ..drawPath(chevron, Paint()..color = color)
      ..restore();
  }

  @override
  bool shouldRepaint(_ChevronMarkPainter oldDelegate) =>
      color != oldDelegate.color || scaleBoost != oldDelegate.scaleBoost;
}
